import { fetchProductsById } from "@/app/api/fetchProduct/route";
import EditProductForm from "@/components/EditProductForm";
// import { connect } from "@/utils/db";
import React from "react";

// export const getProductsById = async (id) => {
//   try {
//     const res = await fetch(`http://localhost3000 /api/addProduct${id}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("Failed to fetch product");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const EditProductPage = async ({ params: { id } }) => {
 
  const product = await fetchProductsById(id);
  const {
    productCategory,
    productDescription,
    productImg,
    productName,
    productPrice,
    productQuantity,
  } = product;

  return (
    <div>
      <EditProductForm
        id={id}
        productCategory={productCategory}
        productDescription={productDescription}
        productImg={productImg}
        productName={productName}
        productPrice={productPrice}
        productQuantity={productQuantity}
      />
    </div>
  );
};

export default EditProductPage;
