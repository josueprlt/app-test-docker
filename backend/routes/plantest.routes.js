const express = require('express');
const router = express.Router();
const planTestController = require('../controllers/plantest.controller');

// CRUD de base
router.post('/', planTestController.createPlanTest);         // /api/plantests/
router.delete('/:planId', planTestController.deleteAllPlanTestByIdPlan);         // /api/plantests/:planId


module.exports = router;