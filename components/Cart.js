"use client";
// import { fetchProductsById } from "@/app/api/fetchProduct/route";
import { Store } from "@/redux/store";
import Link from "next/link";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";

import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const product = await fetch(`/api/singleProduct/${item._id}`);
    if (product.productQuantity < quantity) {
      return toast.error("Sorry! Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart..");
  };
  return (
    <div className=" w-full py-3 pl-3">
      <h1 className=" mb-4 text-xl text-gray-600"> Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty!!{" "}
          <Link href={"/clientsProductsPage/startSales"}>
            Go to Product Page
          </Link>
        </div>
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className=" overflow-x-auto md:col-span-3">
            <table className=" min-w-full">
              <thead className=" border-b">
                <tr>
                  <th className=" px-5 text-left">Product</th>
                  <th className=" px-5 text-right">Quantity</th>
                  <th className=" px-5 text-right">Price</th>
                  <th className=" px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className=" border-b text-center">
                    <td className=" py-3   flex  items-center">
                      <img
                        src={item.productImg}
                        className=" w-[40px] object-cover"
                        alt="img"
                      />{" "}
                      &nbsp;
                      {item.productName}
                    </td>
                    <td className=" text-right  p-3">
                      <select
                      className=" outline-none border-none"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.productQuantity).keys()].map((x) => (
                          <option className="outline-none border-none" key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className=" text-right  p-3">GHS{item.productPrice}</td>
                    <td className=" text-center p-3">
                      <button onClick={() => removeItemHandler(item)}>
                        <CiCircleRemove className=" font-bold text-red-600 h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" p-5">
            <ul>
              <li>
                <div className=" shadow-md border-gray-200 rounded-md border-[1px] p-5 h-fit ">
                  <ul>
                    <li>
                      <p className="pb-2  font-semibold  ">
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}) : GHS
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.productPrice,
                          0
                        )}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("Login?redirect=/Shipping")}
                        className=" bg-[#FFC700]  w-full px-1 py-1 rounded-md"
                      >
                        Check Out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
