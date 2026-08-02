const Prompt = require("../models/promptModel");
const catchAsync = require("../utils/catchAsync");
const geminiAnswerFunction = require("../utils/gemini");
const AppError = require("../utils/appError");

exports.createPrompt = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  console.log("kelgan data", title, description);
  console.log("user_id", req.user.id);
  /// Bu yerda men gemini uchun surov yuboraman prompt berib . prompt user kiritgan prompt

  console.log("gemini surov ketti...");
  const generatedContent = await geminiAnswerFunction(title, description);

  console.log("geminidan javob keldi", generatedContent);
  const newPrompt = await Prompt.create({
    user: req.user.id,
    title: title,
    description: description,
    aiResponse: generatedContent,
  });

  res.status(201).json({
    status: "success",
    data: {
      prompt: newPrompt,
    },
  });
  next();
});

exports.getmyPrompts = catchAsync(async (req, res, next) => {
  const prompLists = await Prompt.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "success",
    data: {
      list: prompLists,
    },
  });
});
