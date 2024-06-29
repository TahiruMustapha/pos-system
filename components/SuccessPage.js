"use client";
import { Store } from "@/redux/store";
import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintReceipt from "./PrintReceipt";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SuccessPage = () => {
  const componentRef = useRef();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=" px-3 py-3 w-full h-screen flex items-center justify-center flex-col">
      <div className=" bg-gray-200 rounded-md w-full h-full  flex flex-col items-center justify-center">
      <IoIosCheckmarkCircle className=" text-9xl text-[#059212]" />
        <h2 className=" text-5xl capitalize text-[#059212] font-semibold"> Payment recieved successfully!!</h2>
        {/* {cartItems.map((product) => (
          <div key={product._id} className=" invisible absolute">
            <PrintReceipt props={product} ref={componentRef} />
          </div>
        ))} */}
         <div  className=" invisible absolute">
            <PrintReceipt props={cartItems} ref={componentRef} />
          </div>
        <div className=" w-full flex items-center justify-center gap-3 mt-3">
          <button className=" px-4 rounded-md py-2 text-gray-600  border-[#059212] border-[1px] bg-transparent">
            <Link href={"/clientsProductsPage"}> Dashboard</Link>
          </button>
          <button
            onClick={handlePrint}
            className=" px-4 rounded-md py-2 text-gray-600  border-[#059212] border-[1px] bg-transparent"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
