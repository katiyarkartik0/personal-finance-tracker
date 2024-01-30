// components/CurrencyDropdown.js
import React from "react";

const CurrencyDropdown = ({ defaultCurrency,setCurrency }) => {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "INR",
    "KWD",
    "PKR",
    "CAD",
    "RUB",
  ];

  return (
    <select className="p-2 border rounded-md" onChange={(e)=>setCurrency(e.target.value)}>
      {currencies.map((currency) => {
        if (currency === defaultCurrency) {
          return (
            <option key={currency} value={currency} selected>
              {currency}
            </option>
          );
        }
        return (
          <option key={currency} value={currency}>
            {currency}
          </option>
        );
      })}
    </select>
  );
};

export default CurrencyDropdown;
