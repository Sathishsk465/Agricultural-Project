const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    scheme_id: { type: String, required: true, unique: true },
    scheme_name: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: String, required: true },
    eligibility: { type: String, required: true },
    approximate_land_acres: { type: String, required: true },
    min_land_required: { type: Number, required: true },
    category: { type: String, required: true },
    state_applicability: { type: String, required: true },
    image_url: { type: String, required: true },
    official_apply_link: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
