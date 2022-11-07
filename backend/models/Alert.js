const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    createdAt: String,
    deviceID: String,
    lat: String,
    lng: String,
    alertType: String,
    isActive: Boolean,
},{ timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);