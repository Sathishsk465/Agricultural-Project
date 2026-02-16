const express = require('express');
const router = express.Router();
const { getTips } = require('../controllers/advisoryController');

router.get('/', getTips);

module.exports = router;
