const express = require('express');
const router = express.Router();
const ackController = require('../controllers/ackController');

const { acceptAck, ackResponse } = ackController;

router.get('/acknowledgement-status', ackResponse);
router.get('/:action', acceptAck);

module.exports = router;
