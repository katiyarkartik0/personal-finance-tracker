import { getAllTransactions } from "../api/transaction";

const History = async () => {
  const fetchTransactions = async () => {
    const response = await getAllTransactions();
    const result = await response.json();
    return result;
  };
  const {transactions} = await fetchTransactions() || [];
  return (
    <>
      <p className="text-3xl font-bold underline">Your Transaction History</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions && transactions.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            <p className="text-lg font-bold mb-2">{item.category}</p>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-xl font-bold mb-4">
              {item.amount} {item.currency}
            </p>
            <p className="text-gray-500">
              {item.date.day}/{item.date.month}/{item.date.year}
            </p>
          </div>
        ))}
      </div>{" "}
    </>
  );
};

export default History;
