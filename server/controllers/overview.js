const {
  findInData,
  sanitizeDateParameters,
  convertAmount,
} = require("../helpers/assets");
const {
  monthsArray,
  getYearsArray,
  daysArray,
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

const getOverviewForDayMonthYear = ({
  transactions,
  normalizedCurrency,
  date: { day, month, year },
}) => {
  const datasets = [];
  transactions.forEach((transaction) => {
    const {
      category,
      amount,
      currency,
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });
    if (isConversionValid) {
      const { indexOfCategory, categoryExists } = findInData({
        datasets,
        category,
      });

      if (categoryExists) {
        datasets[indexOfCategory].data[0] += convertedAmount;
      }
      if (!categoryExists) {
        datasets.push({
          label: category,
          data: new Array(1).fill(0),
        });
        datasets[datasets.length - 1].data[0] += convertedAmount;
      }
    }
  });
  console.log({ datasets }, "ddddddddddddddddddddddddd");
  return { datasets, labels: [`${day}-${month}-${year}`] };
  ///////////////////////////////////////////////////
  // const overview = {};
  // const {
  //   category,
  //   amount,
  //   currency,
  //   date: { day, month, year },
  // } = transaction;
  // const { convertedAmount, isConversionValid, msg } = convertAmount({
  //   amount,
  //   fromCurrency: currency,
  //   toCurrency: normalizedCurrency,
  // });
  // if (isConversionValid) {
  //   if (overview[category]) {
  //     overview[category].amount[0] += convertedAmount;
  //   } else {
  //     overview[category] = {
  //       label: category,
  //       amount: [convertedAmount],
  //     };
  //   }
  // }

  // return { datasets: overview, labels: [`${day}-${month}-${year}`] };
};

const getOverviewAcrossDays = ({ transactions, normalizedCurrency }) => {
  const datasets = [];
  transactions.forEach((transaction) => {
    const {
      category,
      date: { day },
      amount,
      currency,
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });

    if (isConversionValid) {
      const { indexOfCategory, categoryExists } = findInData({
        datasets,
        category,
      });
      if (categoryExists) {
        datasets[indexOfCategory].data[day - 1] += convertedAmount;
      }
      if (!categoryExists) {
        datasets.push({
          label: category,
          data: new Array(33).fill(0),
        });
        datasets[datasets.length - 1].data[day - 1] += convertedAmount;
      }
    }
  });
  return { datasets, labels: daysArray };
};

const getOverviewAcrossMonths = ({ transactions, normalizedCurrency }) => {
  const datasets = [];
  transactions.forEach((transaction) => {
    const {
      category,
      date: { month },
      amount,
      currency,
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });

    if (isConversionValid) {
      const { indexOfCategory, categoryExists } = findInData({
        datasets,
        category,
      });
      if (categoryExists) {
        datasets[indexOfCategory].data[month - 1] += convertedAmount;
      }
      if (!categoryExists) {
        datasets.push({
          label: category,
          data: new Array(12).fill(0),
        });
        datasets[datasets.length - 1].data[month - 1] += convertedAmount;
      }
    }
  });
  return { datasets, labels: monthsArray };
};

const getOverviewAcrossYears = ({ transactions, normalizedCurrency }) => {
  const datasets = [];
  transactions.forEach((transaction) => {
    const {
      category,
      date: { year },
      amount,
      currency,
    } = transaction;
    const { convertedAmount, isConversionValid, msg } = convertAmount({
      amount,
      fromCurrency: currency,
      toCurrency: normalizedCurrency,
    });
    if (isConversionValid) {
      const { indexOfCategory, categoryExists } = findInData({
        datasets,
        category,
      });
      if (categoryExists) {
        datasets[indexOfCategory].data[year - 2000] += convertedAmount;
      }
      if (!categoryExists) {
        datasets.push({
          label: category,
          data: new Array(25).fill(0),
        });
        datasets[datasets.length - 1].data[year - 2000] += convertedAmount;
      }
    }
  });

  return { datasets, labels: getYearsArray() };

  // for (const transaction of transactions) {
  //   const {
  //     category,
  //     amount,
  //     currency,
  //     date: { year },
  //   } = transaction;
  //   const { convertedAmount, isConversionValid, msg } = convertAmount({
  //     amount,
  //     fromCurrency: currency,
  //     toCurrency: normalizedCurrency,
  //   });
  //   if (isConversionValid) {
  //     if (overview[category]) {
  //       overview[category].amount[year - 2000] += convertedAmount;
  //     } else {
  //       overview[category] = {
  //         label: category,
  //         amount: new Array(25).fill(0),
  //       };
  //       overview[category].amount[year - 2000] += convertedAmount;
  //     }
  //   }
  // }
  // return { data };
};

const getOverview = async (req, res) => {
  const { date, normalizedCurrency } = req.body;
  const filteredDate = sanitizeDateParameters(date);
  const { day, month, year } = filteredDate;
  try {
    const transactions = await findTransactions(filteredDate);
    if (day && month && year) {
      console.log("hjkjk");
      const { datasets, labels } = getOverviewForDayMonthYear({
        transactions,
        normalizedCurrency,
        date: { day, month, year },
      });
      console.log(datasets, "kkkkkkk");
      return res.status(200).json({ datasets, labels });
    } else if (month && year) {
      const { datasets, labels } = getOverviewAcrossDays({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    } else if (year) {
      const { datasets, labels } = getOverviewAcrossMonths({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    } else if (!day && !month && !year) {
      const { datasets, labels } = getOverviewAcrossYears({
        transactions,
        normalizedCurrency,
      });
      return res.status(200).json({ datasets, labels });
    }
  } catch (error) {
    console.log(error);
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
