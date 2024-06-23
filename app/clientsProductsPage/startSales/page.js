import { products } from "@/app/api/products/route";
// import StartSales from "../../../components/StartSales";
// import StartSalesPage from "@/components/StartSales";
import StartSales from "../../../components/StartSales";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLockReset } from "react-icons/md";

const page = async () => {
  const product = await products();
 
  // const data = await fetchProductsById(id);
  return (
    <div>
      <StartSales products={product}  />
    </div>
  );
};

export default page;
