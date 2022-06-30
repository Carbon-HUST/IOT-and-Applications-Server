const router = require('express').Router();

const { getByUser, create, update } = require('../controllers/room.controller');

router.get('/', getByUser);
router.post('/', create);
router.patch('/:roomId', update);

module.exports = router;