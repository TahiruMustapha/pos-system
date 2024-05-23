import React from "react";

const AddProduct = () => {
  return (
    <div className=" w-full">
      <h2>Add New Product</h2>
      <div className=" bg-white w-[50%] mt-3 shadow-md rounded-md px-2 py-2">
        <form>
        <div className=" border-gray-400 px-2 py-2 border-[1px] rounded-md">
          <h2 className=" text-gray-500">Product Image:</h2>
          <p className=" text-xs text-gray-400 mb-2 mt-1">
            Supported formats: jpg,jpeg,png{" "}
          </p>
          <div className="border-gray-400 mt-1 mb-2 px-2 py-2 rounded-md  border-[1px]">
            <input className=" text-gray-400" type="file" />
          </div>
          <p className=" text-gray-500">No image set for this product</p>
        </div>
        <div className=" mt-2 flex flex-col">
          <label>Product Name:</label>

          <input
            className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
            type="text"
            placeholder="product name"
          />
        </div>
        <div className=" mt-2 flex flex-col">
          <label>Product Category:</label>

          <input
            className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
            type="text"
            placeholder="product category"
          />
        </div>
        <div className=" mt-2 flex flex-col">
          <label>Product Price:</label>

          <input
            className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
            type="text"
            placeholder="product price"
          />
        </div>
        <div className=" mt-2 flex flex-col">
          <label>Product Quantity:</label>

          <input
            className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
            type="text"
            placeholder="product quantity"
          />
        </div>
        <div className=" mt-2 flex flex-col">
          <label>Product Description:</label>

          <input
            className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
            type="text"
            placeholder="product description"
          />
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
