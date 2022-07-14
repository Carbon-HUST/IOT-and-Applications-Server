const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    deviceTypeId: {
        type: mongoose.Types.ObjectId,
        required: true
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