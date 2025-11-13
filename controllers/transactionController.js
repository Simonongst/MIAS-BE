const Transaction = require("../models/transaction.js");

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
        .sort({ createdAt: -1 });

        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { getAllTransactions };
