const Auth = require('../models/auth')
const mongooseHelper = require('../../helper/mongoose.helper')
const jwt = require('jsonwebtoken');
const mongooseToObject = mongooseHelper.mongooseToObject
class authController {
    index(req, res) {
        res.render('auth/authform')
    }
    async login(req, res) {
        const userExisting = await Auth.findOne({email: req.body.email})
        if(!userExisting) {
            res.status(401).send('Tên đăng nhập không tồn tại.')
            return
            }
        const valid =  await userExisting.verifyPassword(req.body.password)
        if(!valid) {
            res.status(401).send('mật khẩu không đúng.')
            return
        }
        const token = jwt.sign(JSON.stringify({password:req.body.password}), 'shhhhh');
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if (err) {
                console.log(err)
            } else {
                console.log(decoded)
            }
          });
       
        
    }
    async signup(req, res) {
        const userExisting = await Auth.findOne({email: req.body.email})
        if(userExisting) {
            console.log('user Existing')
        } else {
            const user = await Auth.create(req.body)
            const valid = await user.verifyPassword(req.body.password)
            if(valid) {
                const token = jwt.sign(JSON.stringify({ foo: 'bar' }),'shhhhh');
                const createUser = new Auth({...req.body, actoken:token})
                createUser.save()
               
            }
        }
    }
}
module.exports = new authController();
