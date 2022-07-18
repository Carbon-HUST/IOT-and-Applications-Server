const mongoose = require('mongoose');

const DumpSchema = mongoose.Schema({
    id: Number,
    packet_no: Number,
    temperature: Number,
    humidity: Number,
    tds: Number,
    pH: Number
});

module.exports = mongoose.model("Dump", DumpSchema);