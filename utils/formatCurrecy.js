export const formatCurrecy = (price, currency = "USD", rest) => {
  if (!price) return "";
  if (typeof price === "string") price = Number(price);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    ...rest,
  });
  return formatter.format(price);
};
