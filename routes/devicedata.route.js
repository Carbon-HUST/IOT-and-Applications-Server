const router = require('express').Router();

const { getDeviceData, addData } = require('../controllers/devicedata.controller');

router.get("/", getDeviceData);
router.post("/", addData);

module.exports = router;