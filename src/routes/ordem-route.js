'user strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordem-controller');

router.post('/', controller.post);
router.get('/', controller.get);

module.exports = router;