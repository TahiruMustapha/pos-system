"use client";

import { Store } from "@/redux/store";
// import { updateStock } from "@/utils/helper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

const Payment =  () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
// console.log(products)
  // const {
  //   cart: { cartItems, checkOutInfo },
  // } = state;
  const { cart } = state;
  const { checkOutInfo } = cart;
  const { cartItems } = cart;
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

  const updateStock = async () => {
    try {
      const response = await fetch("/api/updateStock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unable to update stock!");
      }
      console.log("Stock updated successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating stock:", error);
      // Optionally: Show an error message to the user here
      alert(`Payment successful, but failed to update stock: ${error.message}. Please contact support.`);
      return false; // Indicate failure
    }
  };

  const  handlePaystackSuccessAction  =  async function(reference){
    try {
       const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const currentMonthNumber = currentMonthIndex + 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthName = monthNames[currentMonthIndex];
    localStorage.setItem("currentMonth", JSON.stringify(currentMonthName));
    localStorage.setItem("currentDate", JSON.stringify(currentDate));
    //CartItems for receipt
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Calculate the overall total sales
    const totalSales = cartItems.reduce((total, item) => {
      return total + item.productPrice * item.quantity;
    }, 0);
    localStorage.setItem("overallTotalSales", JSON.stringify(totalSales));

    const localStorageContent = localStorage.getItem("cartItemsHistory");
    let salesHistory;
    if (localStorageContent === null) {
      salesHistory = [];
    } else {
      salesHistory = JSON.parse(localStorageContent);
    }
    salesHistory.push(cartItems);
      localStorage.setItem("cartItemsHistory", JSON.stringify(salesHistory));
      
      const stockUpdated = await updateStock();

    // await updateStock();
      // try {
      //   const response  = await  fetch("/api/updateStock",{
      //     method:"POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({cartItems}),
          
      //   })
      //   if(!response.ok){
      //     throw new Error("Unable to update stock!")
      //   }
      //   // return response;
      //   console.log("Stock updated successfully!");
      // } catch (error) {
      //    console.error('Error updating stock:', error);
      // }
  
//     dispatch({ type: "CART_CLEAR_ITEMS" });
// Cookies.set(
//       "cart",
//       JSON.stringify({
//         ...cart,
//         cartItems: [],
//       })
//     );
      //     router.push(/clientsProductsPage/success);
      if (stockUpdated) {
        // Only clear cart and redirect if stock update was successful
        dispatch({ type: "CART_CLEAR_ITEMS" });
        Cookies.set(
          "cart",
          JSON.stringify({
            ...cart,
            cartItems: [],
          })
        );
        router.push("/clientsProductsPage/success");
      } else {
        // Handle the case where stock update failed after successful payment
        // The alert in updateStock already notified the user.
        // You might want to redirect to a specific error page or stay on the payment page.
        // Avoid clearing the cart here, as the order state is now inconsistent.
        console.error("Payment successful, but stock update failed. Cart not cleared.");
      }
    } catch (error) {
    console.error("Something went wrong in payment success handler:", error);
    }
   
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
    onSuccess: (reference)=> handlePaystackSuccessAction(reference),
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