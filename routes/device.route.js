const router = require('express').Router();

const { getById, getByRoom, addToRoom, destroy } = require('../controllers/device.controller');

router.get("/room/:roomId", getByRoom);
router.get("/id/:deviceId", getById);
router.post("/room", addToRoom);
router.delete("/:deviceId", destroy);

module.exports = router;