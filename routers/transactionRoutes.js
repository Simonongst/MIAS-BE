const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController.js");

const { getAllTransactions } = transactionController;

// Transactions route
router.get('/', getAllTransactions);

module.exports = router;