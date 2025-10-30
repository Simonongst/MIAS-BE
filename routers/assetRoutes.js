const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController.js");

const { createAsset, getAllAssets, getAssetById } = assetController;

router.post('/', createAsset);
router.get('/', getAllAssets);
router.get('/:assetId', getAssetById);

module.exports = router;