const mongoose = require('mongoose');

const associateSchema = new mongoose.Schema(
  {
    eid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    terminationDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const Associate = mongoose.model('Associate', associateSchema);

module.exports = Associate;
