const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController.js");

const { createInvoice, getAllInvoices, getInvoiceById } = invoiceController;

// Invoices route
router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:invoiceId', getInvoiceById);

module.exports = router;