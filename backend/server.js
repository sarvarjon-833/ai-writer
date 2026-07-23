const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });
const app = require("./app");

const DB = process.env.MONGODB_URI;
mongoose.connect(DB).then(() => {
  console.log("db connected successfully!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
