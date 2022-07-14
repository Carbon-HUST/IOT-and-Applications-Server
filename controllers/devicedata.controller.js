const Device = require('../models/device.model');
const Room = require('../models/room.model');
const DeviceData = require('../models/devicedata.model');
const DeviceType = require('../models/devicetype.model');
const DataAttribute = require('../models/dataattribute.model');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getDeviceData = async (req, res) => {
    const deviceId = req.body.deviceId;
    let startTime = req.body.startTime;
    if (!startTime) {
        throw new BadRequestError("Start time is missing");
    }
    startTime = new Date(startTime);
    if (!startTime) {
        throw new BadRequestError("Start time is invalid");
    }
    let endTime = req.body.endTime;
    if (!endTime) {
        throw new BadRequestError("End time is missing");
    }
    endTime = new Date(endTime);
    if (!endTime) {
        throw new BadRequestError("End time is invalid");
    }

    const result = await DeviceData.find({
        deviceId,
        timestampt: {
            $gte: startTime,
            $lte: endTime
        }
    });

    if (result.length > 0) {
        for (data of result) {
            const attributes = await DataAttribute.findById(data["attributeId"]);
            data["name"] = attributes["name"];
            data["unitOfMeasurement"] = attributes["unitOfMeasurement"];
            data["type"] = attributes["type"];
        }
    }

    return res.status(StatusCodes.OK).json({ result });
}

const addData = async (req, res) => {
    const name = req.body.name;
    if (!name) {
        throw new BadRequestError("Name of data is missing");
    }

    let value = req.body.value;
    if (!value) {
        throw new BadRequestError("Value of data is missing");
    }

    const dataAttribute = await DataAttribute.findOne({ name });
    if (!dataAttribute) {
        throw new BadRequestError("Type of data is not exists");
    }

    if (dataAttribute["type"] === "number") {
        value = Number(value);
    } else if (dataAttribute["type"] === "boolean") {
        value = Boolean(value);
    }

    if (!value) {
        throw new BadRequestError("Value is invalid");
    }

    req.body.attributeId = dataAttribute["_id"];

    const result = await DeviceData.create(req.body);
    return res.status(StatusCodes.CREATED).json({ result });
}

module.exports = {
    getDeviceData,
    addData
}