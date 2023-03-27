const Data = require('../models/members')
const mongooseHelper = require('../../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
class authController {
    index(req, res) {
        res.render('auth/authform')
    }
    login(req, res) {
        res.json('login')
    }
    signup(req, res) {
        res.json('signup')
        
    }
}
module.exports = new authController();
