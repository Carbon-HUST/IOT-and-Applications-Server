const mqtt = require("mqtt");
const Dump = require('./dumpModel');
const DataAttribute = require('../models/dataattribute.model');
const DeviceData = require('../models/devicedata.model');
const Device = require('../models/device.model');

const topic = process.env.TOPIC;
const broker = process.env.BROKER;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const addOneData = async (data) => {
    const now = (new Date()).toISOString();
    const name = data.name;
    if (!name) {
        console.log(`${now}: Name of data is missing`);
        return;
    }

    let value = data.value;
    if (!value) {
        console.log(`${now}: Value of data is missing`);
        return;
    }

    const dataAttribute = await DataAttribute.findOne({ name });
    if (!dataAttribute) {
        console.log(`${now}: Type of data is not exists`);
        return;
    }

    if (dataAttribute["type"] === "number") {
        value = Number(value);
    } else if (dataAttribute["type"] === "boolean") {
        value = Boolean(value);
    }

    if (!value) {
        console.log(`${now}: Value is invalid`);
        return;
    }

    data.attributeId = dataAttribute["_id"];

    const result = await DeviceData.create(data);
    if (name == "status" && (data.value === "ON" || data.value === "OFF")) {
        await Device.findByIdAndUpdate(data.deviceId, {
            status: data.value
        });
        console.log(`${data.deviceId}'s status updated`);
    }
    return result;
}

const addDatas = async (topic, payload) => {
    console.log("data");
    const payloadJson = JSON.parse(payload.toString());
    if (Array.isArray(payloadJson)) {
        for (let data of payloadJson) {
            await addOneData(data);
            console.log("Pushed to database");
        }
    } else {
        await addOneData(payloadJson);
        console.log("Pushed to database");
    }
}

const client = mqtt.connect(broker, {
    username: "server",
    password: "server",
    protocol: "mqtt/tcp"
});

// client.on('connect', (connack) => {
//     console.log("Connected to broker");

// });

client.subscribe(topic);

// client.on("message", async (topic, payload) => {
//     console.log(payload.toString());
//     const payloadJson = JSON.parse(payload.toString());
//     //console.log(payloadJson);
//     try {
//         await Dump.create(payloadJson);
//         console.log("Pushed to database");
//     } catch (err) {
//         console.error(err);
//     }
// });

client.on("message", addDatas);