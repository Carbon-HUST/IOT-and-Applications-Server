const Broker = require('../models/broker.model');
const { StatusCodes } = require('http-status-codes');

const getAll = async (req, res) => {
    const brokers = await Broker.find();
    return res.status(StatusCodes.OK).json({ brokers });
}

const create = async (req, res) => {
    const result = await Broker.create(req.body);

    return res.status(StatusCodes.CREATED).json({ result });
}

const update = async (req, res) => {
    const brokerId = req.params.brokerId;
    const result = await Broker.findByIdAndUpdate(brokerId, req.body, {
        new: true,
        runValidators: true
    });

    if (!result) {
        throw new NotFoundError("Broker not found");
    }

    return res.status(StatusCodes.OK).json({ result });
}

module.exports = {
    getAll,
    create,
    update
}