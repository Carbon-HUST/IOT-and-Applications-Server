const User = require('../models/user.model');
const Home = require('../models/home.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  const home = await Home.findOne({ userId: user._id });
  if (!home) {
    return res.status(StatusCodes.OK).json({ user: { name: user.name }, token, homeId: null });
  }
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token, homeId: home._id });
}

module.exports = {
  register,
  login,
}
