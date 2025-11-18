const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } =
  userController;

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);

module.exports = router;
