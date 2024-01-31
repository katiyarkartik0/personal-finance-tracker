"use client";
import { setDay } from "@/app/store/slice/date";
import React from "react";
import { useDispatch } from "react-redux";

const DaysDropdown = ({ isFormData, formValue, setFormDay }) => {
  const dispatch = useDispatch();
  const days = Array.from({ length: 32 }, (_, index) => index + 1);

  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) =>
        !isFormData
          ? dispatch(setDay({day:e.target.value}))
          : setFormDay(e.target.value)
      }
      defaultValue={!isFormData ? "" : formValue}
    >
      {!isFormData && <option value="">--Choose a day--</option>}
      {days.map((number) => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </select>
  );
};

export default DaysDropdown;
