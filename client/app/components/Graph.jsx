"use client";

import { getOverview } from "@/app/api/overview";
import { Chart as ChartJS, registerables } from "chart.js";

import { useEffect, useState } from "react";
import YearDropdown from "./Dropdown/Year";
import CurrencyDropdown from "./CurrencyDropdown";
import { Bar } from "react-chartjs-2";
import DaysDropdown from "./Dropdown/Days";
import MonthDropdown from "./Dropdown/Month";

const defaultYear = 2022;
const defaultCurrency = "USD";
const options = {
  indexAxis: window.innerWidth > 768 ? "x" : "y",
  plugins: {
    legend: {
      positon: "top",
      align: "start",
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        pointStyle: "circle",
      },
      title: {
        text: "Monthly overview",
        display: true,
        color: "#000",
        font: {
          size: 8,
        },
      },
    },
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  elements: {
    bar: {
      barPercentage: 0.3,
      categoryPercentage: 1,
    },
  },
};

const Graph = () => {
  ChartJS.register(...registerables);
  const [monthlyData, setMonthlyData] = useState({ datasets: [], labels: [] });
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [currency, setCurrency] = useState(defaultCurrency);
  useEffect(() => {
    const fetchOverview = async () => {
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
        setMonthlyData({ datasets, labels });
      } catch (err) {}
    };
    fetchOverview();
  }, [year, currency, day, month]);


  return (
    <>
      <h3>
        Your <DaysDropdown setDay={setDay} />{" "}
        <MonthDropdown setMonth={setMonth} />{" "}
        <YearDropdown setYear={setYear} defaultYear={defaultYear} /> Finance
        Overview in{" "}
        <CurrencyDropdown
          setCurrency={setCurrency}
          defaultCurrency={defaultCurrency}
        />{" "}
        is here
      </h3>
      <Bar
        data={monthlyData}
        height={window.innerWidth > 768 ? 100 : 250}
        options={options}
      />
    </>
  );
};

export default Graph;
