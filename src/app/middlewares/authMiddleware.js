const jwt = require('jsonwebtoken');
console.log(process.env.TOKEN_SECRET)
module.exports = async function authMiddleware (req, res, next) {
   const cookies = req.cookies
   if(!cookies.acceptToken) {
    res.redirect('/auth?signup');
    return
   }
   try {
         jwt.verify(cookies.acceptToken, 'shhhhh');
            next()
    } catch (error) {
        res.redirect('back')
    }
                
    
}