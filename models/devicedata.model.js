const mongoose = require('mongoose');

const DeviceDataSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        enum: ['temperature', 'humidity', 'gas']
    },
    value: {
        type: Number
    },
    status: {
        type: String,
        enum: ['ON', 'OFF']
    },
    timestampt: {
        type: Date,
        default: Date.now
    },
    deviceId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('DeviceData', DeviceDataSchema);