const Room = require('../models/room.model');
const Home = require('../models/home.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getByUser = async (req, res) => {
    const { id } = req.user;
    const homeId = req.body.homeId;

    if (!homeId && homeId !== 0) {
        const home = await Home.findOne({ userId: id });
        if (!home) {
            throw new NotFoundError("Home not found");
        }
        homeId = home._id;
    }

    const rooms = await Room.find({ homeId });

    return res.status(StatusCodes.OK).json(rooms);
}

const create = async (req, res) => {
    const { userId } = req.user;

    let homeId = req.body.homeId;

    if (!homeId && homeId !== 0) {
        const home = await Home.findOne({ userId });
        if (!home) {
            throw new NotFoundError("Home not found");
        }
        homeId = home._id;
    }

    const roomName = req.body.name;
    if (!roomName) {
        throw new BadRequestError("No room's name provded");
    }

    const result = await Room.create({
        name: roomName,
        homeId,
    });

    return res.status(StatusCodes.CREATED).json({ result });
}

const update = async (req, res) => {
    const { id } = req.user;

    const homeId = req.body.homeId;

    if (!homeId && homeId !== 0) {
        const home = await Home.findOne({ userId: id });
        if (!home) {
            throw new NotFoundError("Home not found");
        }
        homeId = home._id;
    }

    const roomId = req.params.roomId;
    const newName = req.body.name;

    const result = await Room.findByIdAndUpdate({
        _id: roomId, homeId
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