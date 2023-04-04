const mongoose = require('mongoose')
const Schema = mongoose.Schema
const catelories = new Schema({
    catelories: Object,

})
module.exports = mongoose.model('Catelories', catelories)
