/**
 * User schema
 * @author Yousuf Kalim
 */
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    photo: String,
    number: String,
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("users", userSchema);
