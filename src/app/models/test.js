const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema
const Data = new Schema ({
    title: String,
    body: String,
    des: String,
    thum: String,
    slug: { type: String, slug: "title"}
})
module.exports = mongoose.model('Data', Data)