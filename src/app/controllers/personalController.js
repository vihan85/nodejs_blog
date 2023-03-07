const Data = require('../models/test')
const mongooseHelper = require('../../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
class PersonalHandler {
    index(req, res) {
        res.render('personal/personal')
    }
    slug(req, res) {
        const slug = req.params.slug
        Data.findOne({slug: slug})
        .then(infomation => {
            res.render('personal/personal',infomation)
        })
    }

    //[GET] / personal/create
    create(req, res) {
        res.render("create")
    }

    // [POST] /personal/store
    store(req, res) {
        const fomatData = req.body
        const updateDatainMongoDB = new Data(fomatData)
        updateDatainMongoDB.save()
            .then(()=>{
                res.redirect('/news')
            })
            .catch(()=>{

            })
       
       
    }
}
module.exports = new PersonalHandler();
