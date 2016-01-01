/**
 * EBDController
 *
 * @description :: Server-side logic for managing EBDS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var ebds = [
//   {
//     "name": "PTSD",
//     "createdAt": "2015-12-27T09:29:06.844Z",
//     "updatedAt": "2015-12-27T09:29:06.844Z",
//     "id": 1
//   }
// ];

module.exports = {
  home: function (req, res) {
    EBD.find({}).sort('name ASC').populate('films').exec(function(err, result) {
      return res.view({
          ebds: result
      });
    });
  },
  view: function (req, res) {
    EBD.findOne({id: req.param('id')}).populate('films').exec(function(err, result) {
      return res.view({
          ebd: result
      });
    });
  },
  createByName: function (req,res) {
    EBD.create({
      name: req.param('name')
    }).exec(function() {
      res.redirect('/ebd/home');
    });
  }
};

