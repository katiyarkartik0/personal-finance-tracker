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

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getYearsArray = () => {
  const yearsArray = [];
  for (let year = 2000; year <= 2024; year++) {
    yearsArray.push(year);
  }
  return yearsArray;
};

const daysArray = Array.from({ length: 32 }, (_, index) => index + 1);


module.exports = {
  currencyExchangeRatesInDollars,
  monthsArray,
  getYearsArray,
  daysArray
};
