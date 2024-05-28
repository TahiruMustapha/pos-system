import mongoose from "mongoose";

export const connect = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
    
    });
    console.log("Connecting to mongoDb successfull!");
  } catch (error) {
    throw new Error("Error connecting to mongoDb!",error);
  }
};
