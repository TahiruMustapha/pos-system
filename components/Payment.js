"use client";
import { Store } from "@/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";

const Payment = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const {
  //   cart: { cartItems, checkOutInfo },
  // } = state;
  const { cart } = state;
  const { checkOutInfo } = cart;
  const publicKey = "pk_test_db4e0085cf211bad348d0f063851f27f6ec7ebb9";
  useEffect(() => {
    setTotalValue(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    setTotalPrice(
      cart.cartItems.reduce((a, c) => a + c.quantity * c.productPrice, 0)
    );
  }, []);
  const componentProps = {
    email: checkOutInfo.email,
    amount: totalPrice * 100,
    metadata: {
      name: checkOutInfo.fullName,
      phone: checkOutInfo.phone,
    },
    publicKey,

    currency: "GHS",
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-gray-200 px-3 py-3 my-3">
      <div className=" w-[50%]  bg-white shadow-md border-gray-200 border-[1px] px-3 py-3 rounded-md">
        <h1 className=" text-center mb-4 text-2xl">Total Amount</h1>
        {/* {[" Voda cash","Momo", "Ready cash"].map((payment) => (
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
          ))} */}
        <p className="pb-2 text-center  font-semibold  ">
          Subtotal ({totalValue}) : GHS
          {totalPrice}
        </p>

        <div className=" mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/clientsProductsPage/checkout")}
            className=" px-4 rounded-md py-2 bg-gray-200"
          >
            Back
          </button>
          <PaystackButton
            {...componentProps}
            type="submit"
            className=" px-4 rounded-md py-2 bg-[#FFF455]"
          >
            Pay
          </PaystackButton>
        </div>
      </div>
    </div>
  );
};

export default Payment;
