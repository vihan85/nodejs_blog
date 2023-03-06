module.exports = {
    mongooseToObject (mongoose) {
        return mongoose.map((res)=> res.toObject())
    }
}