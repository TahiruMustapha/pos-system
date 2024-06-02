import { fetchProductsById } from "@/app/api/fetchProduct/route";
import ProductDetail from "@/components/ProductDetail";
import React from "react";

const SingleProductPage = async ({ params: { _id } }) => {
  const product = await fetchProductsById(_id);
  // console.log((product) )
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default SingleProductPage;
