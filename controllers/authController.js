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

const signIn = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ eid: req.body.eid });
        if(!userInDatabase) {
            return res.status(401).send("Sign-in failed. Invalid Enterprise ID or Password.");
        };

        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        if(!validPassword) {
            return res.status(401).send("Login failed. Invalid Enterprise ID or Password.");
        };

        const claims = { _id: userInDatabase._id.toString(), eid: userInDatabase.eid, role: userInDatabase.role };

        const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
            expiresIn: "15m",
            jwtid: uuidv4(),
        });

        const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
            expiresIn: "30d",
            jwtid: uuidv4(),
        });

        res.status(200).json({ access, refresh });
    } catch (err) {
        res.status(500).redirect("/");
    }
};

const signOut = async (req, res) => {
    try {
        console.log("sign-out request received");
        res.status(200).json({ message: "Sign-out successful."})
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
};

module.exports = { signUp, signIn, signOut };