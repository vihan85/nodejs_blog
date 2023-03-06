const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Data = new Schema ({
    title: String,
    body: String,
    slug: String
})
module.exports = mongoose.model('Data', Data)