const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            return res.status(401).json({ err: "No token provided "});
        };

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ err: 'Not authorized.' });
    }
};

module.exports = verifyToken;