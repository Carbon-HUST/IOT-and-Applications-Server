const User = require('../models/user.model');
const Home = require('../models/home.model');
const bcrypt = require('bcryptjs');
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

const changePassword = async (req, res) => {
	// get user id
	const { userId } = req.user;
	// get current pass, new pass, confirm pass
	const { currentPassword, newPassword, confirmPassword } = req.body;
	// check if one of them is null
	if (!currentPassword || !newPassword || !confirmPassword) {
		throw new BadRequestError("Not enough information provided");
	}
	// check if new pass and confirm pass is the same --> badrequest
	if (newPassword !== confirmPassword) {
		throw new BadRequestError("New password and confirm password must be the same");
	}
	// get user info
	const user = await User.findById(userId);
	if (!user) {
		throw new BadRequestError("Invalid credentials");
	}
	// check if current pass is correct --> badrequest
	const comparisionRes = await user.comparePassword(currentPassword);
	if (!comparisionRes) {
		throw new BadRequestError("Invalid password");
	}
	// hashed password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(newPassword, salt)
	// update user model
	const result = await User.updateOne({
		_id: userId
	}, {
		password: hashedPassword
	});
	// return ok
	return res.status(StatusCodes.OK).json({ result });
}

module.exports = {
	register,
	login,
	changePassword
}
