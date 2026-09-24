const express = require('express');
const controller = require('../controllers/postController');

const router = express.Router();

router.get('/posts', controller.list);
router.get('/posts/:id', controller.getOne);
router.post('/posts', controller.create);
router.post('/posts/:id/likes', controller.like);

module.exports = router;
