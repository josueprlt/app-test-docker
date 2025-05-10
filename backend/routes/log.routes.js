const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

router.post('/api/log', logController.createLog);
router.get('/api/logs', logController.getAllLogs);
router.get('/api/log/:id', logController.getLogById);
router.put('/api/log/:id', logController.updateLog);
router.delete('/api/log/:id', logController.deleteLog);

module.exports = router;