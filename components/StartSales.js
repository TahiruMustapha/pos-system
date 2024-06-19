"use client";
import { addToCart } from "@/redux/productSlice";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { Store } from "@/redux/store";
import Link from "next/link";
// import { fetchProductsById } from "@/app/api/fetchProduct/route";
// import { useRouter } from "next/router";

const StartSalesPage = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  // const [
  //   _id,
  //   productName,
  //   productCategory,
  //   productPrice,
  //   productDescription,
  //   productQuantity,
  // ] = product;

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await fetch(`/api/singleProducts/${product._id}`);
    console.log(data);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    if (product.productQuantity < quantity) {
      toast.error("Sory! Product is out of stock..");
      return null;
    }
    toast.success("Product added to cart");
  };
  return (
    <div>
      <div>
        <nav className=" flex items-center  justify-between py-3 px-3">
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
            <p className=" text-sm flex font-semibold items-center px-2  min-w-[100px]    bg-gray-500  py-2 rounded-lg text-white">
              <BsCart3 className=" cursor-pointer mr-1 font-semibold    text-xl" />
              0
            </p>
            <div className=" w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-gray-300">
              <FaUserAlt className=" text-2xl" />
            </div>

            <span className="  absolute right-11 top-0 bg-[#FF0000] text-white flex items-center justify-center w-4 h-4 text-xs  rounded-full">
              {cart.cartItems.length > 0 ? (
                <span>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              ) : (
                <span>0</span>
              )}
            </span>
          </div>
        </nav>
        <div className="   bg-gray-100 w-full px-4    py-5 h-screen ">
          <div className=" rounded-md px-2 py-2 shadow-md  bg-white">
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
            <div className="  flex items-center justify-center overflow-y-scroll gap-4 flex-wrap  mt-3">
              {product.map((products) => (
                <div className="" key={products._id}>
                   <Link href={`/clientsProductsPage/products/${products._id}`}>
                   <div className=" flex flex-col items-center px-1 rounded-sm py-2 w-[200px] border-gray-300 border-[1px]">
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
                   </Link>
                 
                </div>
              ))}
            </div>
          </div>
          {/* <div className=" px-2 shadow-md rounded-md py-3 w-[40%] bg-white">
            <Cart product={product} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StartSalesPage;
