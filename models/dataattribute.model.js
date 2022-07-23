const mongoose = require('mongoose');

const DataAttributeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        enum: ['temperature', 'humidity', 'gas', 'status']
    },
    type: { // data type of data's value
        type: String,
        enum: ["string", "number", "boolean"],
        default: "string"
    },
    unitOfMeasurement: { // none, degree, percentage, ...
        type: String,
        required: [true, "Please provide measurement unit for data"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("DataAttribute", DataAttributeSchema);