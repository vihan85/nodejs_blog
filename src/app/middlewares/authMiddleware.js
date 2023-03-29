const jwt = require('jsonwebtoken');
module.exports = async function authMiddleware (req, res, next) {
   const cookies = req.cookies
   console.log('cookies: ',cookies)
   if(!cookies.acceptToken) {
    return res.status(401).send('Không tìm thấy access token!');
   }
    const verified =  jwt.verify(cookies.acceptToken, 'shhhhh');
    if(!verified) {
        return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}else {
        console.log('cookies: ',cookies)
        next()
    }
}