const mongoose = require('mongoose');

const HomeSchema = mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Please provide country'],
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    province: {
        type: String,
        required: [true, 'Please provide province'],
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    longtitude: {
        type: Number,
        required: [true, 'Please provide longtitude'],
    },
    latitude: {
        type: Number,
        required: [true, 'Please provide latitude']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: false
    }
}, {
    timestampts: true
});

module.exports = mongoose.model('Home', HomeSchema);