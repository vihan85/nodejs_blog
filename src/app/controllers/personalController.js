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
    create(req, res) {
        res.render("create")
        console.log(req)
    }
    store(req, res) {
        const fomatData = req.body
        fomatData.title = 'hoc lap trinh duoc 10 thang'
        const updateDatainMongoDB = new Data(fomatData)
        updateDatainMongoDB.save()
       
    }
}
module.exports = new PersonalHandler();
