const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');

// CRUD de base
router.get('/all', planController.getAllPlans);      // /api/plans/all
router.get('/:id', planController.getPlanById);      // /api/plans/:id
router.post('/', planController.createPlan);         // /api/plans
router.put('/:id', planController.updatePlan);       // /api/plans/:id
router.delete('/:id', planController.deletePlan);    // /api/plans/:id

router.post('/update', planController.updatePlanById);       // /api/plans/update
router.put('/exclud/:id', planController.updatePlanValidOrNot);       // /api/plans/exclud/:id

module.exports = router;