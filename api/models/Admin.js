/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var md5 = require('md5');

module.exports = {

  attributes: {
    username:{
      type:"string",
      required:true
    },
    password:{
      type:"string",
      required:true
    }
  },
  beforeCreate: function (values, cb) {
    // Encrypt password
    values.password = md5(values.password)
      cb();
  }

};

