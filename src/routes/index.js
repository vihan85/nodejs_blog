const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const personal= require('../app/controllers/personalController')
function routes(app) {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/news', newsRoute);
    app.get('/personal', personalRoute);
    app.get('/personal/create', personal.create);
    app.post('/personal/store', personal.store);
    app.get('/personal/:slug', personal.slug);
    

}
module.exports = routes;
