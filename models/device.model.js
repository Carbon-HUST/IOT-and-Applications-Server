const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for new device'],
        minlength: 2,
        maxlength: 50
    },
    type: {
        type: String,
        enum: ['SENSOR', 'DEVICE'],
        default: 'DEVICE'
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