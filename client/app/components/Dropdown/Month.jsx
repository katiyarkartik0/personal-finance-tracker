// components/MonthDropdown.js
import React from "react";

const MonthDropdown = ({ setMonth }) => {
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
      onChange={(e) => setMonth(e.target.value)}
    >
      <option value="">--Choose a Month--</option>
      {months.map((month, index) => (
        <option key={index + 1} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
