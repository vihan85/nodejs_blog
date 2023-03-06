const Data = require('../models/test')
class NewsHandler {
    index(req, res) {
        Data.find({})
        .then((data)=> {
            res.json(data)
        })
    }
    show(req, res) {
        res.send('news message slug');
    }
}
module.exports = new NewsHandler();
