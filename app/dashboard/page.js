import React, { useContext } from "react";
import { BiCategory, BiSolidDollarCircle } from "react-icons/bi";
import { BsCart4, BsCartX } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { ProductContext } from "./ProductProvider";
import Link from "next/link";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { fetchProducts } from "../api/fetchProduct/route";
import { deleteProduct } from "@/libs/actions";
import DeleteBtn from "@/components/DeleteBtn";
const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const products = await fetchProducts(q);
  //  const  products = { ...product, _id: product._id.toString() };

  // Calculate the total product value
  const totalProductValue = products.reduce(
    (acc, product) => acc + product.productPrice * product.productQuantity,
    0
  );

  // Calculate the number of unique categories
  const categories = new Set(
    products.map((product) => product.productCategory)
  );
  const uniqueCategories = categories.size;

  // Calculate the number of out-of-stock products
  const outOfStockCount = products.filter(
    (product) => product.productQuantity === 0
  ).length;

  return (
    <div className=" pb-6 ">
      {/* Inventory stats */}
      <div className=" mt-3 border-gray-300 border-b-[1px] pb-2 ">
        <p className=" text-2xl text-gray-500">Inventory Stats</p>
        <div className=" w-full mt-3 flex gap-3 items-center justify-start">
          <div className=" px-5 py-3 w-[200px] bg-purple-600">
            <div className=" w-full flex gap-3 items-center">
              <BsCart4 className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">Total Products</p>
                <p>{products.length}</p>
              </div>
            </div>
          </div>
          <div className=" px-5 py-3 w-[200px] bg-green-600">
            <div className=" w-full flex gap-3 items-center">
              <BiSolidDollarCircle className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">Total Store Value</p>
                <p>${totalProductValue}</p>
              </div>
            </div>
          </div>
          <div className=" px-5 py-3 w-[200px] bg-pink-700">
            <div className=" w-full flex gap-3 items-center">
              <BsCartX className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">Out of Stock</p>
                <p>{outOfStockCount}</p>
              </div>
            </div>
          </div>
          <div className=" px-5 py-3 w-[200px] bg-blue-400">
            <div className=" w-full flex gap-3 items-center">
              <BiCategory className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">All Categories</p>
                <p>{uniqueCategories}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Inventory stats */}
      {/* Inventory items */}
      <div className="w-full mt-5">
        <div className=" flex items-center justify-between">
          <p className="text-2xl text-gray-500">Inventory Items</p>
          <Search />
        </div>
      </div>
      {/* Inventory items */}
      {/* Table */}

      <table className=" mt-3 w-full  overflow-y-auto ">
        <thead className=" border-b-blue-600 border-b-[2px] border-t-blue-600 border-t-[2px]">
          <tr className="  ">
            <th className=" p-3 text-sm text-gray-600">s/n</th>
            <th className=" p-3 text-sm text-gray-600">Name</th>
            <th className=" p-3 text-sm text-gray-600">Category</th>
            <th className=" p-3 text-sm text-gray-600">Price</th>
            <th className=" p-3 text-sm text-gray-600">Stock</th>
            <th className=" p-3 text-sm text-gray-600">Value</th>
            <th className=" p-3 text-sm text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody className="" >
          {products.map((product, index) => (
            <tr
              key={product._id}
              className=" bg-white  my-1 border-b-gray-500 border-[1px] text-center  "
            >
              <td className=" p-3  ">{index + 1}</td>
              <td className=" p-3 ">{product.productName}</td>
              <td className=" p-3 ">{product.productCategory}</td>
              <td className=" p-3 ">${product.productPrice}</td>
              <td className=" p-3 ">{product.productQuantity}</td>
              <td className=" p-3 ">
                $ {product.productPrice * product.productQuantity}
              </td>
              <td className=" flex items-center justify-center gap-2 p-3 ">
                <Link href={`/dashboard/productDetail/${product._id}`}>
                  <MdOutlineRemoveRedEye className=" text-pink-600 text-xl cursor-pointer" />
                </Link>
                <Link href={`/dashboard/editProduct/${product._id}`}>
                  <FaEdit className=" text-green-500 text-xl cursor-pointer" />
                </Link>
                 <DeleteBtn id = {product._id.toString()}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table */}
    </div>
  );
};

export default page;
