"use client";
import { ProductContext } from "@/components/ProductProvider";
import React, { useContext } from "react";

const ProductDetail = () => {
  const { products, totalProductValue, uniqueCategories, outOfStockCount } =
    useContext(ProductContext);
  return (
    <div className=" w-full">
      <p className=" mt-2 text-2xl text-gray-500">Product Details</p>
      {products.map((product) => (
        <div
          key={product._id}
          className=" bg-white w-[50%] mb-6  mt-3 shadow-md pb-6 rounded-md px-2 pt-2"
        >
          <div className=" w-full">
            <img src={product.productImg} alt="product-image" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
