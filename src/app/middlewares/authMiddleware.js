const jwt = require('jsonwebtoken');
const variable =  require('../../app/variable')
module.exports = async function authMiddleware (req, res, next) {
   const cookies = req.cookies
   if(!cookies.acceptToken) {
    res.redirect('/auth?signup');
    return
   }
   try {
         jwt.verify(cookies.acceptToken, variable.secretKeyJwt());
            next()
    } catch (error) {
        res.redirect('/auth?login')
    }
}