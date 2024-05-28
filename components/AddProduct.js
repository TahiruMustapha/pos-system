"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";


const AddProduct = () => {
  const [productImg, setProductImg] = useState(null);
  const [productName, setproductName] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productQuantity, setproductQuantity] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productImg ||
      !productName ||
      !productCategory ||
      !productPrice ||
      !productDescription ||
      !productQuantity
    ) {
      setError("All fields are required!!");
    }
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productImg,
          productName,
          productCategory,
          productPrice,
          productDescription,
          productQuantity,
        }),
      });
      if (res.ok) {
        const formBox = e.target;
        formBox.reset();
        toast.success("Product added successfully! ");
      } else {
        console.log("Failed product!!");
      }
    } catch (error) {
      console.log("Error during adding product!", error);
    }
  };
  
  return (
    <div className=" w-full">
      <p className=" mt-2 text-2xl text-gray-500">Add New Product</p>
      <div className=" bg-white w-[50%] mb-6  mt-3 shadow-md pb-6 rounded-md px-2 pt-2">
        <form onSubmit={handleSubmit}>
          <div className=" border-gray-400   px-2 py-2 border-[1px] rounded-md">
            <h2 className=" text-gray-500">Product Image:</h2>
            <p className=" text-xs text-gray-400 mb-2 mt-1">
              Supported formats: jpg,jpeg,png{" "}
            </p>
            <div className="border-gray-400 mt-1 mb-2 px-2 py-2 rounded-md  border-[1px]">
              <input
                onChange={(e) => setProductImg(e.target.files[0])}
                className=" text-gray-400"
                type="file"
              />
            </div>
            <p className=" text-gray-500">No image set for this product</p>
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Name:</label>

            <input
              onChange={(e) => setproductName(e.target.value)}
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product name"
            />
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Category:</label>

            <input
              onChange={(e) => setproductCategory(e.target.value)}
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product category"
            />
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Price:</label>

            <input
              onChange={(e) => setproductPrice(e.target.value)}
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product price"
            />
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Quantity:</label>

            <input
              onChange={(e) => setproductQuantity(e.target.value)}
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product quantity"
            />
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Description:</label>

            <textarea
              onChange={(e) => setproductDescription(e.target.value)}
              className=" resize-none outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product description"
            />
          </div>
          <div className=" mt-3">
            <button
              className=" text-white bg-orange-600 px-2 py-1 rounded-md"
              type="submit"
            >
              Submit
            </button>

            {error && <p className=" text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
