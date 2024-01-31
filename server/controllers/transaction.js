const { sanitizeDateParameters } = require("../helpers/assets");
const { Validator } = require("../helpers/validator");
const Transaction = require("../models/transaction");

const saveTransaction = async (req, res) => {
  const { description, amount, category, currency, date } = req.body;
  const { inputValidation, dateValidation } = new Validator();
  const { isInputValid, msg: inputValidationMessage } = inputValidation({
    description,
    amount,
    category,
    currency,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationMessage });
  }
  const sanitizedDate = sanitizeDateParameters(date)
  const { isValidDate, msg: dateValidationMessage } = dateValidation(sanitizedDate);
  if (!isValidDate) {
    return res.status(400).json({ msg: dateValidationMessage });
  }
  try {
    const transaction = new Transaction({
      description,
      amount,
      category,
      currency,
      date,
    });
    await transaction.save();
    return res.status(200).json({ msg: "Transaction saved successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = {
  saveTransaction,
  getAllTransactions,
};
