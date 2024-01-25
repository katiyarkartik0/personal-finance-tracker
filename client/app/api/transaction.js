import ENDPOINT from "@/app/constants";

export const saveTransaction = async (transactionDetails) =>
  await fetch(`${ENDPOINT}/api/transaction/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionDetails),
  });

export const getAllTransactions = async () =>
  await fetch(`${ENDPOINT}/api/transaction/getAll`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });