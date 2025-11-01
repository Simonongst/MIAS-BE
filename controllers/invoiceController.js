const Invoice = require("../models/invoice.js");

const createInvoice = async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (err) {
        res.status(500).send({ err: err.message });
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

const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.invoiceId);
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { createInvoice, getAllInvoices, getInvoiceById };