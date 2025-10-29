const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController.js");

const { getAllAssets } = assetController;

router.get('/', getAllAssets);

module.exports = router;