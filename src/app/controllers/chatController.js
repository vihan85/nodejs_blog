const Data = require('../models/members')
const mongooseHelper = require('../../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
class ChatHandler {
    index(req, res) {
        res.render('chat');
    }
}
module.exports = new ChatHandler();
