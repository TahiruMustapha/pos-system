import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";

export const fetchUsers = async (q, page, req, res) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;
  try {
    await connect();
    const count = await AddProduct.find({
      productName: { $regex: regex },
    }).count();
    const products = await AddProduct.find({ productName: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, products };
    // return new NextResponse(JSON.stringify(products),{status:200})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
