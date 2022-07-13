const router = require('express').Router();
const authenticationMiddleware = require('../middlewares/authentication');

const {
    register,
    login,
    changePassword
} = require('../controllers/user.controller');

// register --> admin
// login --> user
// change password --> user

router.post('/register', register);
router.post('/login', login);
router.put('/passwd', authenticationMiddleware, changePassword);

module.exports = router;