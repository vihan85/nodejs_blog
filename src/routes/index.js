const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const myPagesController = require('../app/controllers/pricvateContraoller/mypageContraoller')
const authRoute =  require('./auth.route');
function routes(app) {
    
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/news', newsRoute);
    app.use('/personal', personalRoute);
    app.use('/auth', authRoute);
    app.get('/mypage', myPagesController.mypage);
    

    

}
module.exports = routes;
