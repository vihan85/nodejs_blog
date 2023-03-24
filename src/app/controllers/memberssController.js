const Data = require('../models/members')
const mongooseHelper = require('../../helper/mongoose.helper')
const mongooseToObject = mongooseHelper.mongooseToObject
class 
memberssController {
    index(req, res) {
        Data.find({})
        .then((respson)=> {
            const data =mongooseToObject(respson)
            res.render('members/members',{data})
        })
        .catch((err)=>{
           console.log(err)
        })
    }
}
module.exports = new memberssController();
