const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, enter your name!"],
    },
    email: {
      type: String,
      required: [true, "Please ,provide your email"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      default: "user",
    },
    subscriptionPlan: {
      type: String,
      enum: {
        values: ["free", "pro"],
      },
      default: "free",
    },
    password: {
      type: String,
      required: [true, "Please, provide a password"],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please, confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
      select: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
