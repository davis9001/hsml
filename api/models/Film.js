/**
* Film.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'json'
    },
    year: {
      type: 'json'
    },
    rated: {
      type: 'json'
    },
    released: {
      type: 'json'
    },
    runtime: {
      type: 'json'
    },
    genres: {
      type: 'json'
    },
    director: {
      type: 'json'
    },
    writers: {
      type: 'json'
    },
    actors: {
      type: 'json'
    },
    plot: {
      type: 'json'
    },
    language: {
      type: 'json'
    },
    countries: {
      type: 'json'
    },
    awards: {
      type: 'json'
    },
    poster: {
      type: 'json'
    },
    metacritic: {
      type: 'json'
    },
    imdb: {
      type: 'json'
    },
    imdbid: {
      type: 'string',
      required: true
    },
    type: {
      type: 'json',
      required: true
    },
    ebds: {
      collection: 'EBD',
      via: 'films'
    }
  }
};

