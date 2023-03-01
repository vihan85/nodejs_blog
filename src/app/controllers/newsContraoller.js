class NewsHandler {
    index (req, res) {
        res.render('news');
    }
    show (req, res) {
        res.send('news message');
    }
}
module.exports = new NewsHandler