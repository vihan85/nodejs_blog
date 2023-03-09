const express = require('express');
const router = express.Router();

const personalController = require('../app/controllers/personalController');
//[GET] /news/:slug
router.get('/', personalController.index);
router.get('/create', personalController.create);
router.get('/members', personalController.show);
router.post('/store', personalController.store);
router.put('/:id/update',personalController.update);
router.get('/:id/edit',personalController.edit);
router.delete('/:id/delete',personalController.delete);
router.get('/:slug', personalController.slug);

module.exports = router;
