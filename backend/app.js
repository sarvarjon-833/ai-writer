const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorHandle = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const promptRouter = require("./routes/promptRoute");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://ai-writer-delta-topaz.vercel.app",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/prompt", promptRouter);

app.use(globalErrorHandle);

module.exports = app;
