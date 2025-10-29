const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        asset: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
        },
        receivedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;