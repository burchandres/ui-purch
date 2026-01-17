export const formatMoney = (number: number | string) =>
  (typeof number === "string" ? +number : number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export const formatMoneyShort = (number: number | string) => {
  const num = typeof number === "string" ? +number : number;
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (abs >= 1_000_000)
    return `${sign}$${(abs / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  if (abs >= 1_000)
    return `${sign}$${(abs / 1_000).toFixed(1).replace(/\.0$/, "")}k`;

  return `${sign}$${Math.round(abs)}`;
};
