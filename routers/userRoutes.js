const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

const { createUser } = userController;

// Users route
router.post('/', createUser)

module.exports = router;