import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connect();
    const products = await AddProduct.find();
    // res.json(products).status(201);
    return new NextResponse(JSON.stringify(products),{status:200})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
