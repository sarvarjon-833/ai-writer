const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    // Creating user according to req.body like email, name, password , passwordConfirm, role.
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    // Create user and token by CreateSendToken(newUser, 201, req, res) function
    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new AppError(
          "This email has already existed! Please register with new email! ",
        ),
        400,
      );
      return next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check email or password exist
    if (!email || !password) {
      return next(new AppError("Please provide a email or a password"), 400);
    }

    // 2) Check user exist and password correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Please provide a email or a password"), 400);
    }

    // 3) if everything is ok, give a new token to the client
    createSendToken(user, 201, res);
  } catch (err) {
    console.log(err.message);
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "status" });
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

exports.protect = async (req, res, next) => {
  // Getting token and check if it's here
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not log in! Please log in to get access"),
        401,
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token does not longer exist"),
      );
    }

    // Check if user changed the password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401,
        ),
      );
    }

    // Grant access to the protected route
    req.user = currentUser;
    next();
  } catch (err) {
    console.log("error", err.message);
    return next(new AppError("Token yaroqsiz", 401));
  }
};

exports.getMe = (req, res, next) => {
  res.status(201).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
