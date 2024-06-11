import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const fetchProducts = async (q, req, res) => {
  const regex = new RegExp(q, "i");
  try {
    await connect();

    const products = await AddProduct.find({ productName: { $regex: regex } });

    return products;
   
  } catch (error) {
    throw new Error("Unable to fetch product!");
    // console.log(error)
  }
};
export const fetchProductsById = async (id) => {
  try {
    await connect();

    const products = await AddProduct.findOne({ _id: new ObjectId(id) });

    return {
      _id: products._id.toString(),
      productName: products.productName,
      productDescription: products.productDescription,
      productPrice: products.productPrice,
      productQuantity: products.productQuantity,
      productCategory: products.productCategory,
      productImg: products.productImg,
    };
    // return new NextResponse(JSON.stringify({products}),{status:200})
  } catch (error) {
    throw new Error("Unable to add product!");
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await AddProduct.findByIdAndDelete(id)
  return NextResponse.json({message:"Product Deleted!"}, {status:201})
}
