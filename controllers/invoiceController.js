const { findByIdAndDelete } = require('../models/asset.js');
const Invoice = require('../models/invoice.js');

const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, ...newInvoice } = req.body;

    if (invoiceNumber) {
      const invoiceNumberExists = await Invoice.findOne({ invoiceNumber });
      if (invoiceNumberExists) {
        return res.json({
          success: false,
          message: 'Invoice Number already exists.',
        });
      }
    }
    const invoiceToSave = new Invoice({ invoiceNumber, ...newInvoice });

    const savedInvoice = await invoiceToSave.save();
    res.status(201).json({ success: true, data: savedInvoice });
  } catch (err) {
    res.status(500).send({ 
      success: false,
      error: err.message 
    });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(
      req.params.invoiceId
    );
    res.status(200).json(deletedInvoice);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.invoiceId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
