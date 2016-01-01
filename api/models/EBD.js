/**
* EBD.js
*
* @description :: Emotional and behavioral disorders (EBD; sometimes called emotional disturbance or serious emotional disturbance).
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    films: {
      collection: 'Film',
      via: 'ebds'
    }
  }
};

