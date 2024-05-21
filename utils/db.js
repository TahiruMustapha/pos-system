import mongoose from "mongoose";

export const connect = async () => {
  // if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connecting to mongoDb successfull!");
  } catch (error) {
    throw new Error("Error connecting to mongoDb!",error);
  }
};
