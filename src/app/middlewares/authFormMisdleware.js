module.exports = function authForm (req, res, next) {
    res.locals.auth = {
        link: '/auth?login',
        title:  'Sign up',
        type: 'login',
        auth: 'Login'
    }
    if(req.query.hasOwnProperty('log')){
        Object.assign(res.locals.auth, {
            link: '/acount/profile',
            title: 'My Account',
            type: 'signup',
            logout: {
                title: 'Logout',
                link:'/auth/logout'
            }
        })
    }
    if(req.query.hasOwnProperty('login')) {
        Object.assign(res.locals.auth, {
            link: '/auth?signup',
            title: 'Login',
            auth: 'Create a new account',
            type: 'signup'
        })
    }
    
    next()
}