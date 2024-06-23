"use client";
import { Store } from "@/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Payment = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { checkOutInfo, paymentMethod } = cart;
  const submitHandler = (e) => {    
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method required!");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/clientsProductsPage/pay")
  };
  useEffect(() => {
    if (!checkOutInfo.address) {
      return router.push("/clientsProductsPage/checkout");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, checkOutInfo.address]);
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-gray-200 px-3 py-3 my-3">
      <div className=" w-[50%]  bg-white shadow-md border-gray-200 border-[1px] px-3 py-3 rounded-md">
        <form onSubmit={submitHandler}>
          <h1 className=" text-center mb-4 text-2xl">Payment Method</h1>
          {["Momo", "Ready cash"].map((payment) => (
            <div key={payment} className=" mb-4">
              <input
                name="paymentMethod"
                className=" p-2 outline-none"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className=" ml-1" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className=" mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/clientsProductsPage/checkout")}
              className=" px-4 rounded-md py-2 bg-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className=" px-4 rounded-md py-2 bg-[#FFF455]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
