import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  //   if (req.method !== "POST") {
  //     return NextResponse.json(
  //       { message: "Method not allowed!" },
  //       { status: 403 }
  //     );
  //   }
  await connect();

  try {
    const { cartItems } = await req.json(); // Parse the request body
    // const {cartItems} = req.body
    if (!cartItems || !Array.isArray(cartItems)) {
      return NextResponse.json(
        { message: "Invalid cart items data" },
        { status: 400 }
      );
    }

    // Update stock for each item
    // In /api/updateStock backend handler
    const updatePromises = cartItems.map(async (item) => {
      const result = await AddProduct.updateOne(
        { _id: item._id, productQuantity: { $gte: item.quantity } }, // Check if stock >= quantity needed
        { $inc: { productQuantity: -item.quantity } }
      );
      // Check if the update actually happened (matched and modified)
      if (result.matchedCount === 0) {
        // Could be product not found OR insufficient stock
        // You might want to query the product again here to differentiate
        const product = await AddProduct.findById(item._id)
          .select("productQuantity")
          .lean();
        if (!product) {
          throw new Error(`Product not found for item ID: ${item._id}`);
        } else if (product.productQuantity < item.quantity) {
          throw new Error(
            `Insufficient stock for item ID: ${item._id}. Available: ${product.productQuantity}, Needed: ${item.quantity}`
          );
        } else {
          // Another reason match failed (rare)
          throw new Error(
            `Update failed for item ID: ${item._id} for unknown reason.`
          );
        }
      } else if (result.modifiedCount === 0) {
        // Matched but didn't modify - likely means quantity was already 0 or another issue
        console.warn(
          `Stock update matched but did not modify for item ID: ${item._id}`
        );
        // Depending on logic, you might allow this or throw an error
      }
      return result;
    });

    // Execute all updates
    await Promise.all(updatePromises);

    // If Promise.all completes without throwing, all updates were successful
    return NextResponse.json(
      { message: "Stock updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // This catch block handles errors from Promise.all (like insufficient stock) or other issues
    console.error("Error during stock update process:", error);
    return NextResponse.json(
      // Provide a more specific error message if possible
      { message: `Failed to update stock: ${error.message}` },
      // Use 409 Conflict for stock issues, 500 for general server errors
      { status: error.message.includes("Insufficient stock") ? 409 : 500 }
    );
  }
}
