"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productImg, setProductImg] = useState(false);
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     !productImg ||
  //     !productName ||
  //     !productCategory ||
  //     !productPrice ||
  //     !productDescription ||
  //     !productQuantity
  //   ) {
  //     setError("All fields are required!!");
  //   }
  //   try {
  //     const res = await fetch("/api/addProduct", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         productImg,
  //         productName,
  //         productCategory,
  //         productPrice,
  //         productDescription,
  //         productQuantity,
  //       }),
  //     });
  //     if (res.ok) {
  //       const formBox = e.target;
  //       formBox.reset();
  //       console.log("product Image:",productImg)
  //       toast.success("Product added successfully! ");
  //     } else {
  //       console.log("Failed product!!");
  //     }
  //   } catch (error) {
  //     console.log("Error during adding product!", error);
  //   }
  // };
  //create upload preset
  //   // name:products_preset
  //   //cloudName:dpwypmp2s
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  async function unSubmit(data) {
    setLoading(true);
    const raw_img = data.productImg[0];
    const formData = new FormData();
    formData.append("file", raw_img);
    formData.append("upload_preset", "products_preset");
    //upload img to cloudinary
    try {
      const uploadRsponse = await fetch(
        "https://api.cloudinary.com/v1_1/dpwypmp2s/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadRsponse.ok) {
        throw new Error("Image upload faild!");
      }
      const imageData = await uploadRsponse.json();
      const imageUrl = imageData.secure_url;
      // const productData = { ...data, productImg: imageUrl };
      const productData = {
        ...data,
        productImg: imageUrl,
      };
      // console.log(productData)
      const {
        productImg,
        productName,
        productCategory,
        productPrice,
        productDescription,
        productQuantity,
      } = productData;
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
          reset();
        }
      } catch (error) {}

      setLoading(false);
      toast.success("Product added successfully! ");
      router.push("/dashboard")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className=" w-full">
      <p className=" mt-2 text-2xl text-gray-500">Add New Product</p>
      <div className=" bg-white w-[50%] mb-6  mt-3 shadow-md pb-6 rounded-md px-2 pt-2">
        <form onSubmit={handleSubmit(unSubmit)}>
          <div className=" border-gray-400   px-2 py-2 border-[1px] rounded-md">
            <h2 className=" text-gray-500">Product Image:</h2>
            <p className=" text-xs text-gray-400 mb-2 mt-1">
              Supported formats: jpg,jpeg,png{" "}
            </p>
            <div className="border-gray-400 mt-1 mb-2 px-2 py-2 rounded-md  border-[1px]">
              <input
                {...register("productImg", { required: true })}
                id="productImg"
                className=" text-gray-400"
                type="file"
                accept="image/*"
                onChange={() => setProductImg(true)}
              />
              {errors.productImg && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Product image is required
                </p>
              )}
            </div>
            <p className=" text-gray-500">
              {productImg ? `` : `No image set for this product`}
            </p>
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Name:</label>

            <input
              {...register("productName", { required: true })}
              id="productName"
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product name"
            />
            {errors.productName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Product name is required
              </p>
            )}
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Category:</label>

            <input
              {...register("productCategory", { required: true })}
              id="productCategory"
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product category"
            />
            {errors.productCategory && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Product category is required
              </p>
            )}
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Price:</label>

            <input
              {...register("productPrice", { required: true })}
              id="productPrice"
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product price"
            />
            {errors.productPrice && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Product price is required
              </p>
            )}
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Quantity:</label>

            <input
              {...register("productQuantity", { required: true })}
              id="productQuantity"
              className=" outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product quantity"
            />
            {errors.productQuantity && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Product quantity is required
              </p>
            )}
          </div>
          <div className=" mt-2 flex flex-col">
            <label>Product Description:</label>

            <textarea
              {...register("productDescription", { required: true })}
              id="productDescription"
              className=" resize-none outline-none border-gray-400 border-[1px] px-2 mt-1 rounded-md py-2"
              type="text"
              placeholder="product description"
            />
            {errors.productDescription && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Product description is required
              </p>
            )}
          </div>
          <div className=" mt-3">
            {loading ? (
              <button
                disabled
                type="button"
                className="text-white bg-orange-600 px-2 py-1 rounded-md hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium  text-sm  text-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Adding product...
              </button>
            ) : (
              <button
                className=" text-white bg-orange-600 px-2 py-1 rounded-md"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
