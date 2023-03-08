const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const personal= require('../app/controllers/personalController')
const memberssController = require('../app/controllers/memberssController');
function routes(app) {
    
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/news', newsRoute);
    app.get('/personal', personalRoute);
    app.get('/personal/members', memberssController.index);
    app.post('/personal/store', personal.store);
    app.get('/personal/create', personal.create);
    app.put('/personal/:id/update', personal.update);
    app.get('/personal/:id/edit', personal.edit);
    app.get('/personal/:slug', personal.slug);

    

}
module.exports = routes;
