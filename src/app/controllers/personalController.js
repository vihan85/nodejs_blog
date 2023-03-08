const Data = require('../models/members')
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
    // [PUT] /personal/:id/edit
    edit(req, res) {
        const id = req.params.id
        Data.findById(id)
        .then((member)=>{
            const data = member.toObject()
            res.render('members/memberEdit',data)
        })
        .catch (err=>{
            console.log(err)
        })
    }
    update(req, res) {
        const id = req.params.id
        Data.updateOne({_id: id}, req.body)
        .then(()=>{
          res.redirect('/personal/members')
        })
        .catch (err=>{
            console.log(err)
        })
    }
}
module.exports = new PersonalHandler();
