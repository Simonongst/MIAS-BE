const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController.js');

const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = invoiceController;

// Invoices route
router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:invoiceId', getInvoiceById);
router.put('/:invoiceId', updateInvoice);
router.delete('/:invoiceId', deleteInvoice);

module.exports = router;
