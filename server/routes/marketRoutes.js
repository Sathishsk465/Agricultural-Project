const express = require('express');
const router = express.Router();
const { getMarketPrices, addMarketPrice } = require('../controllers/marketController');

router.get('/', getMarketPrices);
router.post('/', addMarketPrice); // You might want protect here later

module.exports = router;
