const currencyExchangeRatesInDollars = {
  USD: 1,
  EUR: 0.88,
  GBP: 0.75,
  JPY: 110.25,
  INR: 73.92,
  KWD: 0.3,
  PKR: 284.15,
  CAD: 1.27,
  RUB: 77.45,
};

const monthLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getYearsArray = () => {
  const yearsArray = [];
  for (let year = 2000; year <= 2024; year++) {
    yearsArray.push(year);
  }
  return yearsArray;
};

module.exports = {
  currencyExchangeRatesInDollars,
  monthLabels,
  getYearsArray,
};
