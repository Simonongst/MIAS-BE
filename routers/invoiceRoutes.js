const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController.js");

const { createInvoice } = invoiceController;

// Invoices route
router.post('/', createInvoice);

module.exports = router;