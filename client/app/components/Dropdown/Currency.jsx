// components/CurrencyDropdown.js
import { setCurrency } from "@/app/store/slice/currency";
import React from "react";
import { useDispatch } from "react-redux";

const CurrencyDropdown = ({ isFormData, defaultCurrency, setFormCurrency }) => {
  const dispatch = useDispatch();
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
    <select
      className="p-2 border rounded-md"
      onChange={(e) =>
        !isFormData
          ? dispatch(setCurrency({ currency: e.target.value }))
          : setFormCurrency(e.target.value)
      }
      defaultValue={defaultCurrency}
    >
      {currencies.map((currency) => {
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
