const router = require('express').Router();

const { getById, getByRoom } = require('../controllers/device.controller');

router.get("/room/:roomId", getByRoom);
router.get("/id", getById);

module.exports = router;