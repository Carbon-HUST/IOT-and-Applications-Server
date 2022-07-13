const router = require('express').Router();

const { create } = require('../controllers/home.controller');

router.post("/", create);

module.exports = router;