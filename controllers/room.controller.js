const Room = require('../models/room.model');
const Home = require('../models/home.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getByUser = async (req, res) => {
    const { id } = req.user;

    const home = await Home.findOne({ userId: id });

    if (!home) {
        throw new NotFoundError("Home not found");
    }

    const rooms = await Room.find({ homeId: home._id });

    return res.status(StatusCodes.OK).json(rooms);
}

const create = async (req, res) => {
    const { id } = req.user;

    const home = await Home.findOne({ userId: id });

    if (!home) {
        throw new NotFoundError("Home not found");
    }

    const roomName = req.body.name;
    if (!roomName) {
        throw new BadRequestError("No room's name provded");
    }

    const result = await Room.create({
        name: roomName,
        homeId: home._id
    });

    return res.status(StatusCodes.CREATED).json({ result });
}

const update = async (req, res) => {
    const { id } = req.user;

    const home = await Home.findOne({ userId: id });

    if (!home) {
        throw new NotFoundError("Home not found");
    }

    const roomId = req.params.roomId;
    const newName = req.body.name;

    const result = await Room.findByIdAndUpdate({
        _id: roomId, homeId: home._id
    }, {
        name: newName
    }, {
        new: true,
        runValidators: true
    });

    if (!result) {
        throw new NotFoundError("Room not found");
    }

    return res.status(StatusCodes.OK).json({ result });
}

module.exports = {
    getByUser,
    create,
    update
}