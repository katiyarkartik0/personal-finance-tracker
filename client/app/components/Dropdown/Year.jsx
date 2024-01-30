// components/YearDropdown.js
import React from "react";

const YearDropdown = ({ setYear }) => {
  const startYear = 2000;
  const endYear = 2024;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) => setYear(e.target.value)}
    >
      <option value="">--Choose an Year--</option>
      {years.map((year) => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
  );
};

export default YearDropdown;
