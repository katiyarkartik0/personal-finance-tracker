import { setYear } from "@/app/store/slice/date";
import React from "react";
import { useDispatch } from "react-redux";

const YearDropdown = ({ isFormData, formValue, setFormYear }) => {
  const dispatch = useDispatch();
  const startYear = 2000;
  const endYear = 2024;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) =>
        !isFormData
          ? dispatch(setYear({ year: e.target.value }))
          : setFormYear(e.target.value)
      }
      defaultValue={!isFormData ? "" : formValue}
    >
      {!isFormData && <option value="">--Choose an Year--</option>}
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
