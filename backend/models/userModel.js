const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    },
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

// Extra middlewares
userSchema.pre("save", async function () {
  // Run only this function when the password was modified
  if (!this.isModified("password")) return;

  // Hash the password with the cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});

userSchema.pre("save", async function () {
  // Run only this function when the password was modified
  if (!this.isModified("password") || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
});

// Functions
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
