const mongoose = require('mongoose');
const uri = "mongodb+srv://node-blog:m0np6huXaxB5UUOc@cluster0.7pwrkrt.mongodb.net/data?retryWrites=true&w=majority";
async function connect () {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected")
        
    } catch (error) {
        console.log(error)
    }
    
       
    
}
module.exports = { connect }