'user strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tags', controller.getByTag);
router.get('/admin/:id', controller.getById);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;