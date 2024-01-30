"use client";
import Graph from "./components/Graph";

export default function Home() {

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
      <p>Get yearly overview</p>
      <Graph/>
    </>
  );
}
