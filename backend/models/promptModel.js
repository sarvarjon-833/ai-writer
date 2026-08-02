const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Prompt must belong to a user"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  aiResponse: {
    type: String,
    required: [true, "AI response is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Prompt = mongoose.model("Prompt", promptSchema);

module.exports = Prompt;
