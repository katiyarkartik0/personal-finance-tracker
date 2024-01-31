import Link from "next/link";
import Dialog from "./Dialog";
import TransactionForm from "./Form";

const Navbar = () => {
  return (
    <>
      <Dialog title="Example Modal">
        <TransactionForm />
      </Dialog>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-bold">
            Financial Overview
          </Link>
          <div className="space-x-4">
            <Link href="/history" className="text-white">
              History
            </Link>
            <Link
              href={{ query: { addTransaction: "true" } }}
              className="underline text-white"
            >
              Add Transaction
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
