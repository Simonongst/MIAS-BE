const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.js");

const signUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ eid: req.body.eid });
        if(userInDatabase) {
            return res.status(409).send("This Enterprise ID is already in use.")
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);

        res.status(201).json({
            message: "Sign-up successful. You can now sign in from the sign-in screen"
        });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
};

module.exports = { signUp };