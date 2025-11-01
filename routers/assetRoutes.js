const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController.js");

const { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset, createComment } = assetController;

// Assets route
router.post('/', createAsset);
router.get('/', getAllAssets);
router.get('/:assetId', getAssetById);
router.put('/:assetId', updateAsset);
router.delete('/:assetId', deleteAsset);
router.post('/:assetId/comments', createComment)

module.exports = router;