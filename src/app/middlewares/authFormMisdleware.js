module.exports = function authForm (req, res, next) {
    res.locals.auth = {}
        
    if(req.query.hasOwnProperty('login')) {
        Object.assign(res.locals.auth, {
            link: '/auth?signup',
            title: 'Sign up',
            auth: 'Login',
            type: 'signup'

        })
    }else{
        Object.assign(res.locals.auth, {
            link: '/auth?login',
            title: 'Login',
            auth: 'Create a new account',
            type: 'login'

        })
    }
    next()
}