import ProductDetail from "@/components/ProductDetail";
import { ProductContext } from "@/components/ProductProvider";
import getPrducts from "@/libs/getProduct";
// import { useRouter } from "next/router";

import React, { useContext } from "react";

export default function SingleProductPage() {
  // const { products } = useContext(ProductContext);
  // const product = await getPrducts(_id);

  return (
    <div className=" w-full p-3">
      <div>
        
        <ProductDetail/>
      </div>
    </div>
  );
}
