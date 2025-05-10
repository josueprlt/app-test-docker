const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

// CRUD de base
router.get('/', testController.getAllTests);         // /api/tests
router.get('/:id', testController.getTestById);      // /api/tests/:id
router.post('/', testController.createTest);         // /api/tests
router.put('/:id', testController.updateTest);       // /api/tests/:id
router.delete('/:id', testController.deleteTest);    // /api/tests/:id

module.exports = router;