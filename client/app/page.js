"use client";
import Image from "next/image";
import Dialog from "./components/Dialog";
import TransactionForm from "./components/Form";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Home() {
  ChartJS.register(...registerables);

  const data = {
    labels: ["January", "February"],
    datasets: [
      {
        label: "Brutto",
        borderRadius: 30,
        data: [0.1, 0.4],
        barThickness: 10,
      },
      {
        label: "Netto",
        borderRadius: 30,
        data: [0.5, 0.9],
        barThickness: 10,
      },
    ],
  };

  const options = {
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
          text: "Sales",
          display: true,
          color: "#000",
          font: {
            size: 18,
          },
        },
      },
    },
    options: {
      responsive: true,
    },
    // scales: {
    //   xAxis: {
    //     display: false,
    //   },
    //   yAxis: {
    //     max: 1,
    //   },
    // },
    elements: {
      bar: {
        barPercentage: 0.3,
        categoryPercentage: 1,
      },
    },
  };

  // async function onClose() {
  //   "use server";
  //   console.log("Modal has closed");
  // }

  // async function onOk() {
  //   "use server";
  //   console.log("Ok was clicked");
  // }

  return (
    <>
      hello
      <Bar data={data} height={60} options={options} />
    </>
  );
}
