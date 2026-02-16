const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
    commodity: { type: String, required: true },
    district: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    modalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
