const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController.js");

const { createAsset, getAllAssets } = assetController;

router.post('/', createAsset);
router.get('/', getAllAssets);

module.exports = router;