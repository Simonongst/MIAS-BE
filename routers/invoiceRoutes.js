const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController.js");

const { createInvoice, getAllInvoices } = invoiceController;

// Invoices route
router.post('/', createInvoice);
router.get('/', getAllInvoices);

module.exports = router;