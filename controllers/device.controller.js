const Device = require('../models/device.model');
const Room = require('../models/room.model');
const DeviceData = require('../models/devicedata.model');
const DeviceType = require('../models/devicetype.model');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

// get all devices in a room
// add a device in a room
// update a device in a room
// delete a device in a room
// get data of a device in a room in a time period
// get data of all devices in a room in a time period

const getById = async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await Device.findById(deviceId);
    if (!device) {
        throw new NotFoundError("Device not found");
    }

    device.deviceType = await DeviceType.findById(device["deviceTypeId"]);

    return res.status(StatusCodes.OK).json({ device });
}

const getByRoom = async (req, res) => {
    const roomId = req.body.roomId;
    const room = await Room.exists({ _id: roomId });
    if (!room) {
        throw new NotFoundError("Room not found");
    }

    const devices = await Device.find({
        roomId: roomId
    });

    return res.status(StatusCodes.OK).json({ devices });
}

const addToRoom = async (req, res) => {
    const roomId = req.body.roomId;
    const deviceTypeId = req.body.deviceTypeId;
    const room = await Room.exists({ _id: roomId });
    if (!room) {
        throw new NotFoundError("Room not found");
    }

    if (!(await DeviceType.exists({ _id: deviceTypeId }))) {
        throw new NotFoundError("Device type not found");
    }

    const device = await Device.create(req.body);
    return res.status(StatusCodes.CREATED).json({ device });
}

const update = async (req, res) => {
    const deviceId = req.params.deviceId;
    const result = await Device.findByIdAndUpdate(deviceId, req.body, {
        new: true,
        runValidators: true
    });

    if (!result) {
        throw new NotFoundError("Device not found");
    }

    return res.status(StatusCodes.OK).json({ result });
}


const destroy = async (req, res) => {
    const deviceId = req.params.deviceId;
    const result = await Device.findByIdAndRemove(deviceId);
    if (!result) {
        throw new NotFoundError("Device not found");
    }

    return res.status(StatusCodes.OK).send();
}

const addDeviceData = async (req, res) => {

}

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

    const data = await DeviceData.find({
        deviceId,
        timestampt: {
            $gte: startTime,
            $lte: endTime
        }
    });

    return res.status(StatusCodes.OK).json({ data });
}

module.exports = {
    getById,
    getByRoom,
    addToRoom,
    update,
    destroy,
    getDeviceData
}