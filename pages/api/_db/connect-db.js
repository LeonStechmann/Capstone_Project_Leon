import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
  if (!process.env.MONGO_DB_URI) {
    throw new Error("Please set environment variable MONGO_DB_URI.");
  }
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGO_DB_URI);
  return handler(req, res);
};

export default connectDB;
