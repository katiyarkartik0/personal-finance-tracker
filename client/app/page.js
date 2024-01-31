"use client";
import { useEffect } from "react";
import Graph from "./components/Graph";
import { getOverview } from "./api/overview";
import { setOverview } from "./store/slice/overview";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrency, selectDate } from "./helpers/selectors";

export default function Home() {
  const dispatch = useDispatch();
  const {
    date: { day, month, year },
  } = useSelector(selectDate);
  const { currency } = useSelector(selectCurrency);
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
        dispatch(setOverview({ datasets, labels }));
      } catch (err) {}
    };
    fetchOverview();
  }, [year, currency, day, month]);

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
      <p>Get financial overview</p>
      <Graph/>
    </>
  );
}
