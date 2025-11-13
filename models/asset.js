const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const assetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'Laptop',
        'Desktop',
        'Monitor',
        'Mouse',
        'Keyboard',
        'Mobile',
        'Tablet',
        'Other',
      ],
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
      enum: ['New', 'Used', 'Damaged', 'Disposed'],
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Associate',
    },
    status: {
      type: String,
      required: true,
      enum: ['Assigned', 'Loaned', 'Available'],
    },
    acknowledged: {
      type: Boolean,
      required: true,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
