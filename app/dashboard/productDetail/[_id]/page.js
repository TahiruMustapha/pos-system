import { fetchProducts } from "@/app/api/fetchProduct/route";
import ProductDetail from "@/components/ProductDetail";
import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { ObjectId } from "mongodb";
import React from "react";

// async function fetchProductById(_id) {
//   await connect();
//   // const product = await AddProduct.findOne({ _id: new ObjectId(id) });
//   const products = await fetchProducts(_id);
//   // console.log("Products",products)
//   return products;
// }

const SingleProductPage = async ({ params: { _id } }) => {
  const products = await fetchProducts(_id);

  return (
    <div>
      <ProductDetail product={products} />
    </div>
  );
};

export default SingleProductPage;
