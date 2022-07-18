const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    deviceType: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "DeviceType"
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', DeviceSchema);
//module.exports.Schema = DeviceSchema;