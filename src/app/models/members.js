const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema
const Data = new Schema ({
    title: String,
    body: String,
    des: String,
    thum: String,
    slug: { type: String, slug: "title"},
    
})

// plugin
Data.plugin(slug);
Data.plugin(mongooseDelete, { overrideMethods: 'all' });


module.exports = mongoose.model('Data', Data)