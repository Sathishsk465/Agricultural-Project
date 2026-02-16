const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, default: 'Other' },
    description: { type: String },
    price_per_kg: { type: Number, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    whatsapp: { type: String, required: true },
    seller_name: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


