const express = require("express");
const transactionRoutes = express.Router();
const bodyParser = require("body-parser");
const {
    saveTransaction, getAllTransactions
} = require("../controllers/transaction");

transactionRoutes.use(bodyParser.urlencoded({ extended: false }));
transactionRoutes.use(bodyParser.json());

transactionRoutes.post("/save", saveTransaction);
transactionRoutes.get("/getAll", getAllTransactions);

module.exports = { transactionRoutes };