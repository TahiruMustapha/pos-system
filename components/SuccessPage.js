"use client";
import { Store } from "@/redux/store";
import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintReceipt } from "./PrintReceipt";

const SuccessPage = () => {
  const componentRef = useRef();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // console.log( typeof(cartItems))
  return (
    
      <div className=" w-full h-screen flex items-center justify-center flex-col">
        Payment recieved successfully
        {/* {cartItems.map((product) => (
          <div key={product._id} className=" invisible absolute">
            <PrintReceipt  props={product} ref={componentRef} />
          </div>
        ))} */}
         <div  className=" invisible absolute">
            <PrintReceipt  props={cartItems} ref={componentRef} />
          </div>
        <button
          onClick={handlePrint}
          className=" px-4 rounded-md py-2 bg-[#FFF455]"
        >
          Print Receipt
        </button>
      </div>
  
  );
};

export default SuccessPage;
