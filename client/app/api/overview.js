import ENDPOINT from "../constants";

export const getOverview = async ({ date, normalizedCurrency }) =>
  await fetch(`${ENDPOINT}/api/overview/overview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, normalizedCurrency }),
  });
