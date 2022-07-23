const router = require('express').Router();

const { getAll, create, update } = require('../controllers/broker.controller');

router.get("/", getAll);
router.post("/", create);
router.put("/:brokerId", update);

module.exports = router;