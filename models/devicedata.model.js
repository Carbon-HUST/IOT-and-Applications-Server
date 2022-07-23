const mongoose = require('mongoose');

const DeviceDataSchema = mongoose.Schema({
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    // status: {
    //     type: String,
    //     enum: ['ON', 'OFF'],
    //     default: 'ON'
    // },
    additionalInfo: mongoose.Schema.Types.Mixed,
    timestamp: {
        type: Date,
        default: Date.now
    },
    deviceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    attributeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "DataAttribute"
    }
});

module.exports = mongoose.model('DeviceData', DeviceDataSchema);