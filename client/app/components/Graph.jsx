"use client";
import { Chart as ChartJS, registerables } from "chart.js";

import { useMemo } from "react";
import YearDropdown from "./Dropdown/Year";
import CurrencyDropdown from "./Dropdown/Currency";
import { Bar } from "react-chartjs-2";
import DaysDropdown from "./Dropdown/Days";
import MonthDropdown from "./Dropdown/Month";
import useIsMobile from "../hooks/useIsMobile";
import { useSelector } from "react-redux";
import {
  selectOverview,
} from "../helpers/selectors";

const defaultYear = 2022;
const defaultCurrency = "USD";

const Graph = () => {
  ChartJS.register(...registerables);
  const monthlyData = useSelector(selectOverview);

  const isMobile = useIsMobile();

  const options = useMemo(
    () => ({
      indexAxis: isMobile ? "y" : "x",
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
    }),
    [isMobile]
  );

  return (
    <>
      <h3>
        Your <DaysDropdown /> <MonthDropdown />{" "}
        <YearDropdown defaultYear={defaultYear} /> Finance Overview in{" "}
        <CurrencyDropdown
          defaultCurrency={defaultCurrency}
        />{" "}
        is here
      </h3>
      <Bar data={monthlyData} height={isMobile ? 250 : 100} options={options} />
    </>
  );
};

export default Graph;
