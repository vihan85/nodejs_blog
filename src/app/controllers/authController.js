const Auth = require('../models/auth')
const mongooseHelper = require('../../helper/mongoose.helper')
const jwt = require('jsonwebtoken');
const mongooseToObject = mongooseHelper.mongooseToObject
class authController {
    index(req, res) {
        res.render('auth/authform')
    }
    async login(req, res,next) {
        const userExisting = await Auth.findOne({email: req.body.email})
        if(!userExisting) {
            res.status(401).send('Tên đăng nhập không tồn tại.')
            return
            }
        const passwordValid =  await userExisting.verifyPassword(req.body.password)
        if(!passwordValid) {
            res.status(401).send('mật khẩu không đúng.')
            return
        }
        const acceptToken = jwt.sign(JSON.stringify({password:req.body.password}), 'shhhhh');
        res.json({
            message: 'Đăng nhập thành công',
            acceptToken
        })
        res.end()
        
    }
    async signup(req, res) {
        const userExisting = await Auth.findOne({email: req.body.email})
        if(userExisting) {
            console.log('user Existing')
        } else {
            const user = await Auth.create(req.body)
            const valid = await user.verifyPassword(req.body.password)
            if(valid) {
                const createUser = new Auth({...req.body, acceptToken:''})
                createUser.save()
               
            }
        }
    }
    mypage(req, res) {
        res.render('myPages/orderPage')
    }
}
module.exports = new authController();
