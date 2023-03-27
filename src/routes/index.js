const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const authRoute =  require('./auth.route');
function routes(app) {
    
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/news', newsRoute);
    app.use('/personal', personalRoute);
    app.use('/auth', authRoute);
    

    

}
module.exports = routes;
