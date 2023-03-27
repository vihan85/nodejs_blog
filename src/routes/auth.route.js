const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/authController');
// [POST] /create
router.get('/', authController.index);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
module.exports = router;
