const Home = require('../models/home.model');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
    req.body.userId = req.user.userId;
    const result = await Home.create(req.body);

    return res.status(StatusCodes.CREATED).json({ result });
}

module.exports = {
    create
}