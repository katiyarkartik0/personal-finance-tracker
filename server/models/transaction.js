const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String },
        currency: { type: String, required: true },
        date: { type: Date },
    },
    { timestaps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;