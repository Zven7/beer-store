// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import stockPrices from "public/stock-price";

// Return stock and price for the specified SKU ex: 10167
export default function handler(req, res) {
  const ID = req.query.id;
  const STOCK = stockPrices[ID];

  if (isNaN(ID)) {
    res.status(400).json({ message: "The ID must be a number", status: 400 });
  }

  if (STOCK === undefined) {
    res.status(404).json({ message: "Product not found", status: 404 });
  }

  res.status(200).json({ value: STOCK, status: 200 });
}
