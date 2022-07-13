const mongoose = require('mongoose');

const DataAttributeSchema = mongoose.Schema({
    name: { // temperature, humidity, ...
        type: String,
        required: [true, "Please provide name of data"],
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