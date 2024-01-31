"use client";
import { useState } from "react";
import DaysDropdown from "./Dropdown/Days";
import MonthDropdown from "./Dropdown/Month";
import YearDropdown from "./Dropdown/Year";
import CurrencyDropdown from "./Dropdown/Currency";
import { saveTransaction } from "../api/transaction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrency, selectDate } from "../helpers/selectors";
import { setOverview } from "../store/slice/overview";
import { getOverview } from "../api/overview";

const defaultCurrency = "USD";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const {
    date: { day, month, year },
  } = useSelector(selectDate);
  const { currency } = useSelector(selectCurrency);
  const [formData, setFormData] = useState({
    description: "",
    amount: 1,
    category: "",
    currency: defaultCurrency,
    date: {
      day: "",
      month: "",
      year: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setFormDay = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      date: { ...prevData.date, day },
    }));
  };
  const setFormMonth = (month) => {
    setFormData((prevData) => ({
      ...prevData,
      date: { ...prevData.date, month },
    }));
  };
  const setFormYear = (year) => {
    setFormData((prevData) => ({
      ...prevData,
      date: { ...prevData.date, year },
    }));
  };
  const setFormCurrency = (currency) => {
    setFormData((prevData) => ({ ...prevData, currency }));
  };

  const fetchOverview = async ({ day, month, year }) => {
    let date = {};
    if (day && month && year) {
      date = { day, month, year };
    } else if (month && year) {
      date = { month, year };
    } else if (year) {
      date = { year };
    }
    try {
      const response = await getOverview({
        date,
        normalizedCurrency: currency,
      });
      const { datasets, labels } = await response.json();
      dispatch(setOverview({ datasets, labels }));
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      await saveTransaction(formData);
      await fetchOverview({
        day: formData.date.day,
        month: formData.date.month,
        year: formData.date.year,
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <CurrencyDropdown
          setFormCurrency={setFormCurrency}
          isFormData={true}
          defaultCurrency={defaultCurrency}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Date:
          <div className="flex space-y-2 flex-col">
            <DaysDropdown
              setFormDay={setFormDay}
              isFormData={true}
              formValue={day}
            />
            <MonthDropdown
              setFormMonth={setFormMonth}
              isFormData={true}
              formValue={month}
            />
            <YearDropdown
              setFormYear={setFormYear}
              isFormData={true}
              formValue={year}
            />
          </div>
        </label>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
