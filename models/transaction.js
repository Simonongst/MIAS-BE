const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    asset: {
      _id: mongoose.Schema.Types.ObjectId,
      assetName: String,
      serialNumber: String,
      category: String,
    },
    performedBy: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      username: String,
    },
    changes: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;