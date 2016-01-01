/**
 * FilmController
 *
 * @description :: Server-side logic for managing films
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var omdb =  require('omdb');


module.exports = {
  home: function (req, res) {
    Film.find({}).sort('title ASC').populate('ebds', {sort: 'name ASC'}).exec(function(err, result) {
      return res.view({
          films: result
      });
    });
  },
  view: function (req, res) {
    Film.findOne({id: req.param('id')}).populate('ebds', {sort: 'name ASC'}).exec(function(err, result) {
      return res.view({
          film: result
      });
    });
  },
  findNewBySearch: function (req, res) {
    omdb.search(req.param('title'), function(err, films) {
      if (err) {
        return res.view({
          error: err,
          films: {}
        });
      }

      if (films.length < 1) {
        return res.view({
          warning: 'No films found.',
          films: {}
        });
      }

      return res.view({
        films: films
      });
    });
  },
  findNewByIMDBID: function (req, res) {
    omdb.get({imdb: req.param('imdbid')}, function(err, film) {
      if (err) {
        return res.view({
          error: err
        });
      }

      Film.count({imdbid: req.param('imdbid')}).exec(function(errir, existingFilmCount) {
        if (existingFilmCount > 0) {
          Film.findOne({imdbid: req.param('imdbid')}).exec(function(error, existingFilm) {
            return res.view({
              film: film,
              filmExists: true,
              existingFilm: existingFilm
            });
          });
        } else {
          return res.view({
            filmExists: false,
            film: film,
          });
        }
      });

    });
  },
  addNewFilm: function (req, res) {
    omdb.get({imdb: req.param('imdbid')}, function(err, film) {
      if (err) {
        return res.view({
          error: err
        });
      }
      Film.create({
        title: film.title,
        year: film.year,
        rated: film.rated,
        released: film.released,
        runtime: film.runtime,
        countries: film.countries,
        genres: film.genres,
        director: film.director,
        writers: film.writers,
        actors: film.actors,
        plot: film.plot,
        poster: film.poster,
        imdb: film.imdb,
        imdbid: film.imdb.id,
        tomato: film.tomato,
        metacritic: film.metacritic,
        awards: film.awards,
        type: film.type
      }).exec(function(err, created) {
        if (!err) {
          return res.redirect('/film/home');
        }

        return res.redirect('/film/findNewByIMDBID/?imdbid='+req.param('imdbid'));
      });
    });
  },
  attachEbdBrowser: function (req, res) {
    Film.findOne({id: req.param('id')}).populate('ebds').exec(function(err, film) {
      var ebdIds = [];
      for (var k in film.ebds) {
        ebdIds.push(film.ebds[k].id);
      }
      EBD.find({id: { '!' : ebdIds }}).sort('name ASC').exec(function(err, ebds) {
        return res.view({
          ebds: ebds,
          filmid: req.param('id'),
          filmTitle: film.title,
          filmId: film.id,
          filmPoster: film.poster
        });
      });
    });
  },
  attachEbd: function (req, res) {
    Film.findOne({id: req.param('id')}).populate('ebds').exec( function(err, film) {
      EBD.findOne({id: req.param('ebdid')}).exec(function(ebderror, ebdresponse) {
        film.ebds.add(ebdresponse);
        film.save(function() {
          return res.redirect('/film/view/'+req.param('id')+'/');
        });
      });
    });
  },
  removeEbd: function (req, res) {
    Film.findOne({id: req.param('id')}).populate('ebds').exec( function(err, film) {
      EBD.findOne({id: req.param('ebdid')}).exec(function(ebderror, ebdresponse) {
        film.ebds.remove(ebdresponse.id);
        film.save(function() {
          return res.redirect('/film/view/'+req.param('id')+'/');
        });
      });
    });
  }
};

