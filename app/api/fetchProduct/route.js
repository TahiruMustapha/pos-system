import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";

export const fetchUsers = async (q,req, res) => {
  const regex = new RegExp(q,"i")
  try {
    await connect();
    const products = await AddProduct.find({productName:{$regex: regex}});
    
    return products;
    // return new NextResponse(JSON.stringify(products),{status:200})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
