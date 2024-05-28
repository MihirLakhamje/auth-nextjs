import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName:{
      type: String,
      required: true,
      min: [3, "name must be atleast 3 characters"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password must be at least 6 characters"]
    },
    role: {
      type: String,
      enum: ["user", "admin", "admitted"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
