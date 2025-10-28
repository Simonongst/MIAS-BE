const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const assetSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ["laptop", "desktop", "monitor", "mouse", "keyboard", "mobile", "tablet", "other"],
        },
        assetName: {
            type: String,
            required: true,
            trim: true,
        },
        serialNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        origin: {
            type: String,
            required: true,
            trim: true,
        },
        condition: {
            type: String,
            required: true,
            enum: ["new", "used", "damaged", "retired"],
        },
        invoice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
        },
        ownership: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comments: [commentSchema],
    },
    { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;