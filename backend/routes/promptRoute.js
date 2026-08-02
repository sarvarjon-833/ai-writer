const express = require("express");
const authController = require("../controllers/authController");
const promptController = require("../controllers/promptController");

const router = express.Router();

router.use(authController.protect);

router.post("/", promptController.createPrompt);
router.get("/", promptController.getmyPrompts);

module.exports = router;
