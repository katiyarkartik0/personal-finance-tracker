import React from "react";

const DaysDropdown = ({ setDay }) => {
  const days = Array.from({ length: 32 }, (_, index) => index + 1);

  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) => setDay(e.target.value)}
    >
      <option value="">--Choose a day--</option>
      {days.map((number) => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </select>
  );
};

export default DaysDropdown;
