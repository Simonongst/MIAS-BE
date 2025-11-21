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
    const { eid, ...newUser } = req.body;

    if (eid) {
      const eidExists = await User.findOne({ eid });
      if (eidExists) {
        return res.json({
          success: false,
          message: 'EID already exists.',
        });
      }
    }
    const userToSave = new User({ eid, ...newUser });

    const hashedPassword = bcrypt.hashSync(userToSave.password, 10);
    userToSave.password = hashedPassword;

    const savedUser = await User.create(userToSave);
    const { password, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
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
