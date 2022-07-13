const router = require('express').Router();

const { getById, getByRoom, getDeviceData } = require('../controllers/device.controller');

router.get("/room", getByRoom);
router.get("/data", getDeviceData);

module.exports = router;