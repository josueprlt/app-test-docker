const express = require('express');
const router = express.Router();
const launchController = require('../controllers/launch.controller');

router.post('/:type', launchController.execLaunchByName);         // /api/launch/:type

module.exports = router;
