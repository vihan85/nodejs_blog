const express = require('express');
const router = express.Router();

const personalController = require('../app/controllers/personalController');
//[GET] /news/:slug
router.get('/', personalController.index);
module.exports = router;
