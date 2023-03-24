const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const personal= require('../app/controllers/personalController')
const memberssController = require('../app/controllers/memberssController');
function routes(app) {
    
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/news', newsRoute);
    app.use('/personal', personalRoute);
    

    

}
module.exports = routes;
