const mongoose = require('mongoose');
const deviceSchema = require('./device.model').Schema;

const RoomSchema = mongoose.Schema({
    homeId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'A room must belong to a home']
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for room'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);