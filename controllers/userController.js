const User = require("../models/user.js");

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { createUser };