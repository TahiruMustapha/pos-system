"use client";

import { Store } from "@/utils/store";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLockReset } from "react-icons/md";

const StartSalesPage = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [productQuantity, ...others] = product;
  // console.log(productQuantity.productQuantity)
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { product_quantity, ...others } = product;
    if (productQuantity.productQuantity < quantity) {
      toast.error("Product is out of stock!");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };
  return (
    <div>
      <div>
        <nav className=" flex items-center justify-between py-3 px-3">
          <div className=" border-gray-300 border-[1px] w-[40%] py-1 rounded-md flex items-center justify-between ">
            <p className=" flex items-center gap-2">
              <LiaSearchSolid className=" text-2xl" />
              <input
                type="text"
                className=" w-full outline-none border-none"
                placeholder="Search Here"
              />
            </p>
            <IoIosArrowRoundDown className=" text-2xl" />
          </div>
          <div className=" relative flex items-center gap-2">
            <IoSettingsOutline className=" cursor-pointer text-xl" />
            <BsCart3 className=" cursor-pointer mr-2 text-xl" />
            <div className=" w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-gray-300">
              <FaUserAlt className=" text-2xl" />
            </div>

            {cart.cartItems.length >= 1 ? (
              <span className="  absolute right-11 top-0 bg-[#FF0000] text-white flex items-center justify-center w-4 h-4 text-xs  rounded-full">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            ) : (
              <span className="  absolute right-11 top-0 bg-[#FF0000] text-white flex items-center justify-center w-4 h-4 text-xs  rounded-full">
                0
              </span>
            )}
          </div>
        </nav>
        <div className=" flex gap-3 bg-gray-100 w-full px-4    py-5 h-screen ">
          <div className=" rounded-md px-2 py-2 shadow-md w-[60%] bg-white">
            <div className=" flex items-center justify-between">
              <div>
                <input
                  type="text"
                  className=" px-1 py-2 outline-none bg-white border-gray-200 border-[1px] rounded-sm"
                  placeholder="Search Product"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="  px-1 py-2 outline-none bg-white border-gray-200 border-[1px] rounded-sm"
                  placeholder="Scan barcode here"
                />
              </div>
            </div>
            <div className=" flex items-center justify-center overflow-y-scroll gap-4 flex-wrap  mt-3">
              {product.map((products) => (
                <div className="" key={products._id}>
                  <div className=" flex flex-col items-center px-1 rounded-sm py-2 w-[135px] border-gray-300 border-[1px]">
                    <img
                      src={products.productImg}
                      alt="image"
                      className=" w-[40px] h-[40px] object-cover rounded-full"
                    />
                    <p>{products.productName}</p>
                    <p className=" text-red-600 font-semibold">
                      {" "}
                      GHS {products.productPrice}
                    </p>
                    <input
                      type="number"
                      className=" outline-none border-gray-300 border-[1px] rounded-sm px-3 py-1 w-[100px]"
                      defaultValue={0}
                    />
                    {products.productQuantity >= 1 ? (
                      <p className=" px-2 py-1 bg-gray-400 rounded-md  my-2 text-white">
                        {products.productQuantity} Available
                      </p>
                    ) : (
                      <p className=" px-2 py-1 bg-gray-400 rounded-md  my-2 text-white">
                        Unavailable
                      </p>
                    )}

                    <button
                      onClick={addToCartHandler}
                      className=" w-full px-2 py-1 bg-gray-500 rounded-md  my-2 text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" px-3 shadow-md rounded-md py-3 w-[40%] bg-white">
            <div className=" w-full mb-3 flex items-center justify-end">
              <button className=" bg-[#FF0000] flex items-center text-white px-2 py-2 rounded-md">
                {" "}
                <MdLockReset /> Clear cart
              </button>
            </div>
            <div className=" flex  items-center w-full justify-center">
              <table className=" w-full">
                <thead className="  bg-gray-200">
                  <tr className="   ">
                    <th className=" p-2 text-sm text-gray-600 ">ProductName</th>
                    <th className=" p-2 text-sm text-gray-600">Qty</th>
                    <th className=" p-2 text-sm text-gray-600">Price</th>
                    <th className=" p-2 text-sm text-gray-600">Total</th>
                    <th className=" p-2 text-sm text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSalesPage;
