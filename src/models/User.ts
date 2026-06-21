import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be atleast 6 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // resetOtp: {
    //   type: String,
    //   default: null,
    // },
    // resetOtpExpires: {
    //   type: Date,
    //   default: null,
    // },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;