const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    asset: {
      type: String,
      ref: 'Asset',
    },
    performedBy: {
      type: String,
      ref: 'User',
    },
    changes: {
        type: Object,
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
