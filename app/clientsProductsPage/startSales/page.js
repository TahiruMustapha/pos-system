import { products } from "@/app/api/products/route";
import StartSalesPage from "@/components/StartSales";
import React from "react";
const page = async ({ params: { id } }) => {
  const product = await products();
 
  // console.log(product)

  return <div>
    <StartSalesPage product ={product} />
  </div>;
};

export default page;
