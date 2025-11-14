const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  signOut,
  changePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/authController.js');
const verifyToken = require('../middleware/verifyToken');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);
router.post('/change-password', verifyToken, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
