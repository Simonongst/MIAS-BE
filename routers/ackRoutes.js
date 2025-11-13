const express = require('express');
const router = express.Router();
const ackController = require('../controllers/ackController');

const { approveAck, ackResponse } = ackController;

router.get('/acknowledgement-status', ackResponse);
router.get('/:action', approveAck);

module.exports = router;
