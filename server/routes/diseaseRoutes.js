const express = require('express');
const router = express.Router();
const { identifyDisease } = require('../controllers/diseaseController');

router.post('/identify', identifyDisease);

module.exports = router;
