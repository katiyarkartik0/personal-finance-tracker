// components/MonthDropdown.js
import { setMonth } from "@/app/store/slice/date";
import React from "react";
import { useDispatch } from "react-redux";

const MonthDropdown = ({ isFormData, formValue, setFormMonth }) => {
  const dispatch = useDispatch();

  const months = [
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

  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) =>
        isFormData
          ? setFormMonth(e.target.value)
          : dispatch(setMonth({month:e.target.value}))
      }
      defaultValue={!isFormData ? "" : formValue}
    >
      {!isFormData && <option value="">--Choose a Month--</option>}
      {months.map((month, index) => (
        <option key={index + 1} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
