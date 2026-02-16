const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    village: { type: String, required: true },
    crops: [{ type: String }],
    location: {
        latitude: Number,
        longitude: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
