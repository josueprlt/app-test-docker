const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.put('/exclud/:id', testController.excludTestById);      // /api/tests/exclud/:id

router.get('/type', testController.getTestByType);                          // /api/tests/type
router.get('/status/status', testController.getTestWithStatus);                 // /api/tests/status/status
router.get('/type/all', testController.getAllTestsByType);                 // /api/tests/type/:type
router.put('/type/invalidate', testController.invalidateTestByType);      // /api/tests/type/invalidate/:type


// CRUD de base
router.get('/', testController.getValidTests);       // /api/tests
router.get('/all', testController.getAllTests);      // /api/tests/all
router.get('/:id', testController.getTestById);      // /api/tests/:id
router.post('/', testController.createTest);         // /api/tests
router.put('/:id', testController.updateTest);       // /api/tests/:id
router.delete('/:id', testController.deleteTest);    // /api/tests/:id


module.exports = router;