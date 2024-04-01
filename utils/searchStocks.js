import { stockPrices, stocks } from "../data";

export const searchStocks = (text) => {
  if (!text) return [];

  return stocks.filter(
    (i) =>
      i.ticker.match(new RegExp(text, "i")) ||
      i.companyName.match(new RegExp(text, "i"))
  );
};

export const selectStock = (text) => {
  const stock = stocks.filter((i) => i.ticker === text);
  if (stock) return stock[0];
  return null;
};

export const selectStockPrices = (text) => {
  const stock = stockPrices.filter((i) => i.ticker === text);
  if (stock) return stock[0].prices;
  return null;
};
