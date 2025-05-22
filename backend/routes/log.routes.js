const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

router.post('/', logController.createLog);
router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLogById);
router.put('/:id', logController.updateLog);
router.delete('/:id', logController.deleteLog);
router.delete('/all/:id', logController.deleteAllLogsByIdTest);

module.exports = router;