const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController.js");

const { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset } = assetController;

router.post('/', createAsset);
router.get('/', getAllAssets);
router.get('/:assetId', getAssetById);
router.put('/:assetId', updateAsset);

module.exports = router;