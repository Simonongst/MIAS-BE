const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

const { getAllUsers, getUserById } = userController;

// Users route
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;