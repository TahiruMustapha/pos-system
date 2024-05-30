import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connect();
    const product = AddProduct.findOne({ _id: new ObjectId(id) });
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
}
