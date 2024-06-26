"use client";
import { Store } from "@/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
  const { cartItems } = cart;
  // const { cartInfo } = state;
  // console.log(cartInfo);
  const publicKey = "pk_test_db4e0085cf211bad348d0f063851f27f6ec7ebb9";
  useEffect(() => {
    setTotalValue(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    setTotalPrice(
      cart.cartItems.reduce((a, c) => a + c.quantity * c.productPrice, 0)
    );
  }, []);
  const config = {
    reference: new Date().getTime().toString(),
    email: checkOutInfo.email,
    amount: totalPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey,
  };
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.

    alert("Please don't leave Benab!");
  };
  const handlePaystackSuccessAction = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    localStorage.setItem("currentDate", JSON.stringify(currentDate));
    //CartItems for receipt
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    //CartItems for user history retrieved
    // const existingCartItemHistory =
    //   JSON.parse(localStorage.getItem("cartItemsHistory"));

       // Append the new cartItems array to the existing data
    // existingCartItemHistory.push(cartItems);
    localStorage.setItem(
      "cartItemsHistory",
      JSON.stringify(cartItems)
    );
    dispatch({ type: "CART_CLEAR_ITEMS" });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        cartItems: [],
      })
    );
    router.push(`/clientsProductsPage/success`);
  };
  const componentProps = {
    // email: checkOutInfo.email,
    // amount: totalPrice * 100,
    // metadata: {
    //   name: checkOutInfo.fullName,
    //   phone: checkOutInfo.phone,
    // },
    // publicKey,
    ...config,
    currency: "GHS",
    text: "Pay Now",
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  };
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-gray-200 px-3 py-3 my-3">
      <div className=" w-[50%]  bg-white shadow-md border-gray-200 border-[1px] px-3 py-3 rounded-md">
        <h1 className=" text-center mb-4 text-2xl">Total Amount</h1>

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
