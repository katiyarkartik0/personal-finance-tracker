const { Validator } = require("../helpers/validator");
const Transaction = require("../models/transaction");

const findTransactions = async (date) => {
  let queryObj = {};
  Object.keys(date).forEach((key) => {
    const attribute = `date.${key}`;
    queryObj = { ...queryObj, [attribute]: date[key] };
  });
  return await Transaction.find(queryObj);
};

const sanitizeDateParameters = (date) => {
  let sanitizedDate = {};
  Object.keys(date).forEach((key) => {
    sanitizedDate = { ...sanitizedDate, [key]: Number(date[key]) };
  });
  return sanitizedDate;
};

const getOverview = async (req, res) => {
  const date = req.query;
  const filteredDate = sanitizeDateParameters(date);
  const { dateValidation } = new Validator();
  const { isValidDate, msg: dateValidationMessage } =
    dateValidation(filteredDate);
  if (!isValidDate) {
    return res.status(400).json({ msg: dateValidationMessage });
  }
  try {
    const overview = await findTransactions(filteredDate);
    console.log(overview)

    const sortedOverview = {
      investments: [],
      earnings: [],
      spendings: [],
      others: [],
    };
    overview.forEach((transaction) => {
      const { category } = transaction;
      if(sortedOverview[category]){
        sortedOverview[category].push(transaction);
      }
      else{
        sortedOverview.others.push(transaction);
      }
    });
    console.log(overview)
    return res.status(200).json({ overview: sortedOverview });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { getOverview };
