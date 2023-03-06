const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/newsContraoller');
router.use('/', newsController.index);
//[GET] /news/:slug
router.use('/:slug', newsController.show);
// [GET] /news

module.exports = router;
