const mongoose = require("mongoose");

const BrokerSchema = mongoose.Schema({
    host: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Broker", BrokerSchema);