const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    vendor: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "completed"],
        default: "pending"
    },
});

module.exports = mongoose.model("Invoice", invoiceSchema);