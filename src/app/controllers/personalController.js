const Data = require('../models/members')
const mongooseHelper = require('../../helper/mongoose.helper')
const { count } = require('../models/members')
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

    showTrash(req, res) {

        Data.findDeleted({})
        .then((respson)=> {
            const data =mongooseToObject(respson)
            res.render('members/memberTrash',{data})
        })
        .catch((err)=>{
           console.log(err)
        })
    }

    show(req, res) {
        let dataMembers = Data.find({})
        const curentPage = req.query.page
        const limit = 8
        const startIndex = curentPage * limit
        if(req.query.hasOwnProperty('page')) {
            dataMembers = Data.find({}).skip().limit(8)
        }
        if(req.query.hasOwnProperty('_sort')) {
            dataMembers = dataMembers.sort({
                [req.query.column] : req.query.type
            })
        }

        Promise.all([Data.countDeleted(),dataMembers])
        .then(([count,data])=>{
            const members = mongooseToObject(data)
            res.render('members/members',{count,members})
        })
        .catch((err)=>{
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

    delete(req, res) {
        Data.delete({_id: req.params.id})
        .then(()=>{
          res.redirect('back')
        })
        .catch (err=>{
            console.log(err)
        })
    }
    restore(req, res) {
        Data.restore({_id: req.params.id})
        .then(()=>{
          res.redirect('back')
        })
        .catch (err=>{
            console.log(err)
        })
    }
    forceDelete(req, res) {
        Data.deleteOne({_id: req.params.id})
        .then(()=>{
          res.redirect('back')
        })
        .catch (err=>{
            console.log(err)
        })
    }
   
}
module.exports = new PersonalHandler();
