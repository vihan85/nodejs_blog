const newsRoute = require('./new.route');
const personalRoute = require('./personal.route');
const myPagesController = require('../app/controllers/pricvateContraoller/mypageContraoller')
const chatController = require('../app/controllers/chatController')
const authRoute =  require('./auth.route');
const Data = require('../app/models/members');
const mongooseHelper = require('../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
function routes(app) {
    app.get('/', (req, res) => {
        Data.find({})
        .then((respson)=> {
            const data = mongooseToObject(respson)
            res.render('home', {data})
        })
        .catch((err)=>{
            console.log(err)
        })
    });
    app.get('/news', newsRoute);
    app.use('/personal', personalRoute);
    app.use('/auth', authRoute);
    app.get('/mypage', myPagesController.mypage);
    app.get('/chat', chatController.index);
    
}
module.exports = routes;
