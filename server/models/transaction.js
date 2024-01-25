const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    description: { type: String },
    amount: { type: Number },
    category: { type: String },
    currency: { type: String },
    date: {
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
    },
  },
  { timestaps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
