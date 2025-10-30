const Asset = require("../models/asset.js");

const createAsset = async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        const savedAsset = await newAsset.save();
        res.status(201).json(savedAsset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
 };

const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find({});
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId);
        res.status(200).json(asset);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { createAsset, getAllAssets, getAssetById };