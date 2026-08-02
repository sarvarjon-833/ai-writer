const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.protect, authController.getMe);

// For only Admin
router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
// router
//   .route("/:id")
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
