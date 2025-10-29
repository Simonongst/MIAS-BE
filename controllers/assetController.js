const Asset = require("../models/asset.js");

const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find({});
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { getAllAssets };