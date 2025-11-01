const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut } = require("../controllers/authController.js");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

module.exports = router;