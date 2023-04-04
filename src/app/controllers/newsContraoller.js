const Data = require('../models/members')
const mongooseHelper = require('../../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
class NewsHandler {
    index(req, res) {
        Data.find({})
        .then((respson)=> {
            const data = mongooseToObject(respson)
            res.render('news', {data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    show(req, res) {
        res.send('news message slug');
    }
}
module.exports = new NewsHandler();
