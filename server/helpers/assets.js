const {
  currencyExchangeRatesInDollars: currencyExchangeRates,
} = require("./constants");

const findInData = ({ datasets, category }) => {
  for (let i = 0; i < datasets.length; i++) {
    const { label } = datasets[i];
    if (category === label) {
      return { categoryExists: true, indexOfCategory: i };
    }
  }
  return { categoryExists: false };
};

const sanitizeDateParameters = (date) => {
  let sanitizedDate = {};
  Object.keys(date).forEach((key) => {
    sanitizedDate = { ...sanitizedDate, [key]: Number(date[key]) };
  });
  return sanitizedDate;
};

const convertAmount = ({ amount, fromCurrency, toCurrency }) => {
  if (
    !(fromCurrency in currencyExchangeRates) ||
    !(toCurrency in currencyExchangeRates)
  ) {
    return { isConversionValid: false, msg: "Invalid currency code" };
  }
  const conversionRate =
    currencyExchangeRates[toCurrency] / currencyExchangeRates[fromCurrency];
  const convertedAmount = amount * conversionRate;

  return { isConversionValid: true, convertedAmount };
};

module.exports = { findInData, sanitizeDateParameters, convertAmount };
