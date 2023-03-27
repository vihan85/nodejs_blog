const Auth = require('../models/auth')
const mongooseHelper = require('../../helper/mongoose.helper')
const { exists } = require('../models/members')
const mongooseToObject = mongooseHelper.mongooseToObject
class authController {
    index(req, res) {
        res.render('auth/authform')
    }
    async login(req, res) {
        const userExisting = await Auth.findOne({email: req.body.email})
        try {
            const valid =  await userExisting.verifyPassword(req.body.password)
            if(valid) {
                // signin

            } else{
                console.log('please! create account')
            }
        } catch (error) {
            console.log(error)
        }
    }
    async signup(req, res) {
        const userExisting = await Auth.findOne({email: req.body.email})
        if(userExisting) {
            console.log('user Existing')
        } else {
            const user = await Auth.create(req.body)
            const valid = await user.verifyPassword(req.body.password)
            if(valid) {
                const createUser = new Auth(req.body)
                createUser.save()
                Auth.close()
            }
        }
    }
}
module.exports = new authController();
