import Image from "next/image";
import Dialog from "./components/Dialog";
import Link from "next/link";
import TransactionForm from "./components/Form";

export default function Home() {
  async function onClose() {
    "use server";
    console.log("Modal has closed");
  }

  async function onOk() {
    "use server";
    console.log("Ok was clicked");
  }

  return (
    <>
      hello
      <Link
        href={{ query: { showDialog: "y" } }}
        className="text-3xl underline"
      >
        Go to Products with Modal
      </Link>
      <Dialog title="Example Modal" onClose={onClose} onOk={onOk}>
        <TransactionForm/>
      </Dialog>
    </>
  );
}
