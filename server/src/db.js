import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("\nMONGO DB connection successful");
  } catch (error) {
    console.log("MONGO DB connection error", error.message);
    process.exit(1);
  }
}

export default connectDB;
