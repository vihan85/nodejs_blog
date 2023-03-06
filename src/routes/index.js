const newsRoute = require('./new.route');
function routes(app) {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/news', newsRoute);
}
module.exports = routes;
