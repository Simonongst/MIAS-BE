const express = require("express");
const router = express.Router();
const nodemailerController = require("../controllers/nodemailerController.js");

const { sendEmail } = nodemailerController;

router.post('/', sendEmail);

module.exports = router;