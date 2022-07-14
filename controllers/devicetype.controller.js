const DeviceType = require('../models/devicetype.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { NotBeforeError } = require('jsonwebtoken');

const getAll = async (req, res) => {
    const result = await DeviceType.find();
    return res.status(StatusCodes.OK).json({ result });
}

const create = async (req, res) => {
    const result = await DeviceType.create(req.body);
    return res.status(StatusCodes.CREATED).json({ result });
}

const update = async (req, res) => {
    const deviceTypeId = req.body.deviceTypeId;
    if (!deviceTypeId) {
        throw new BadRequestError("Device type's id is missing");
    }
    const result = await DeviceType.findByIdAndUpdate(deviceTypeId, req.body, {
        runValidators: true,
        new: true
    });
    if (!result) {
        throw new NotBeforeError("Device type not found");
    }
    return res.status(StatusCodes.OK).json({ result });
}

module.exports = {
    getAll,
    create,
    update
}