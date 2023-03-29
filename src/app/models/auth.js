const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema
const Auth = new Schema ({
    acceptToken:String,
    email:String,
    password: { type: String, required: true, bcrypt: true },
    secret: { type: String, bcrypt: true },
    actoken: String,
    foo: {
    bar: {
      baz: { type: String, bcrypt: true }
    }
  }
    
})

// plugin
Auth.plugin(bcrypt);


module.exports = mongoose.model('Auth', Auth)