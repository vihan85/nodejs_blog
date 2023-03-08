const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/membersContraoller');
// [GET] /news
router.use('/', newsController.index);
module.exports = router;
