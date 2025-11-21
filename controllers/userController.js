const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ eid: req.body.eid });
    if (userInDatabase) {
      return res.status(409).send('This Enterprise ID is already in use.');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword;

    const savedUser = await User.create(req.body);
    const { password, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
