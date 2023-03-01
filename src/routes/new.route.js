const express = require('express');
const router = express.Router()

const newsController = require('../app/controllers/newsContraoller')
//[GET] /news/:slug
router.use('/:slug',newsController.show)
// [GET] /news
router.use('/',newsController.index)

module.exports = router