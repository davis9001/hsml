/**
* User.js
*
* @description :: Basic user model connected to multiple Roles.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string'
    },
    emailAddress: {
      type: 'email',
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    roles: {
      collection: 'Role',
      via: 'users'
    }
  }
};

