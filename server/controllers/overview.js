const {
  currencyExchangeRatesInDollars: currencyExchangeRates,
  monthLabels,
  getYearsArray,
} = require("../helpers/constants");
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

const getOverviewForDayMonthYear = ({ transaction, normalizedCurrency }) => {
  const overview = {};
  const {
    category,
    amount,
    currency,
    date: { day, month, year },
  } = transaction;
  const { convertedAmount, isConversionValid, msg } = convertAmount({
    amount,
    fromCurrency: currency,
    toCurrency: normalizedCurrency,
  });
  if (isConversionValid) {
    if (overview[category]) {
      overview[category].amount[0] += convertedAmount;
    } else {
      overview[category] = {
        label: category,
        amount: [convertedAmount],
      };
    }
  }

  return { datasets: overview, labels: [`${day}-${month}-${year}`] };
};

const getOverviewAcrossMonths = ({ transactions, normalizedCurrency }) => {
  const overview = {};
  for (const transaction of transactions) {
    const {
      category,
      amount,
      currency,
      date: { month },
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });
    if (isConversionValid) {
      if (overview[category]) {
        overview[category].amount[month] += convertedAmount;
      } else {
        overview[category] = {
          label: category,
          amount: new Array(13).fill(0),
        };
        overview[category].amount[month] += convertedAmount;
      }
    }
  }
  return { datasets: overview, labels: monthLabels };
};

const getOverviewAcrossYears = ({ transactions, normalizedCurrency }) => {
  const overview = {};
  for (const transaction of transactions) {
    const {
      category,
      amount,
      currency,
      date: { year },
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });
    if (isConversionValid) {
      if (overview[category]) {
        overview[category].amount[year - 2000] += convertedAmount;
      } else {
        overview[category] = {
          label: category,
          amount: new Array(25).fill(0),
        };
        overview[category].amount[year - 2000] += convertedAmount;
      }
    }
  }
  return { datasets: overview, labels: getYearsArray() };
};

const getOverview = async (req, res) => {
  const { date, normalizedCurrency } = req.body;
  const filteredDate = sanitizeDateParameters(date);
  const { day, month, year } = filteredDate;
  try {
    const transactions = await findTransactions(filteredDate);
    if (day && month && year) {
      const { datasets, labels } = getOverviewForDayMonthYear({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    }
    if ((day && year) || year) {
      const { datasets, labels } = getOverviewAcrossMonths({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    }
    if ((day && month) || month) {
      const { datasets, labels } = getOverviewAcrossYears({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    }
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { getOverview };

("dd-mm-yyyy"); //getTodaysTransaction

("yyyy"); //create an object of index mm

("dd-yyyy"); //create an object of index mm

("mm");
//create an object of index yyyy

("dd-mm"); // create an object of index yyyy

//////////////////////////////////////////////////////////////////////////////////////////////////
("dd"); //create an object of index mm-yyyy

("mm-yyyy"); // create an array of size 32
//create an objext of index made up of 32-days
