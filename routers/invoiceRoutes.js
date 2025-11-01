const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController.js");

const { createInvoice, getAllInvoices, getInvoiceById, updateInvoice } = invoiceController;

// Invoices route
router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:invoiceId', getInvoiceById);
router.put('/:invoiceId', updateInvoice);

module.exports = router;