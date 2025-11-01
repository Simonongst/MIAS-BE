const Asset = require("../models/asset.js");

const createAsset = async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        const savedAsset = await newAsset.save();
        res.status(201).json(savedAsset);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

const updateAsset = async (req, res) => {
    try {
        const updatedAsset = await Asset.findByIdAndUpdate(
            req.params.assetId,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedAsset);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const deletedAsset = await Asset.findByIdAndDelete(req.params.assetId);
        res.status(200).json(deletedAsset);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const createComment = async (req, res) => {
    try {
        req.body.author = req.user._id;
        const asset = await Asset.findById(req.params.assetId);
        asset.comments.push(req.body);
        await asset.save();

        const newComment = asset.comments[asset.comments.length - 1];
        newComment._doc.author = req.user;

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset, createComment};