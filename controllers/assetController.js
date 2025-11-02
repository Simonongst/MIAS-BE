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
        const assets = await Asset.find({})
        .populate("invoice")
        .populate("owner", "eid role");

        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId)
        .populate("invoice")
        .populate("owner", "eid role");
        
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

const getAssetComments = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId);
        if(!asset) {
            return res.status(404).send("Asset not found.");
        };

        res.status(200).json(asset.comments);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const updateAssetComment = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId);
        if(!asset){
            return res.status(404).send("Asset not found.");
        };

        const comment = asset.comments.id(req.params.commentId);
        if(!comment){
            return res.status(404).send("Comment not found.");
        };

        if(!["Admin", "Editor"].includes(req.user.role)){
            return res.status(403).send("You do not have the permission to update comments")
        };

        comment.set(req.body);
        await asset.save();

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const deleteAssetComment = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetId);
        if(!asset){
            return res.status(404).send("Asset not found.");
        };

        const comment = asset.comments.id(req.params.commentId);
        if(!comment){
            return res.status(404).send("Comment not found.");
        };

        if(!["Admin", "Editor"].includes(req.user.role)){
            return res.status(403).send("You do not have the permission to delete comments.");
        }

        comment.deleteOne();
        await asset.save();

        res.status(200).json({ message: "Comment deleted successfully." });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset, createComment, getAssetComments, updateAssetComment, deleteAssetComment };