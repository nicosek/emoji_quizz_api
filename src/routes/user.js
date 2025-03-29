const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const User = require("../models/User");

const auth = require("../middlewares/auth_middleware");
const authorize = require("../middlewares/authorize");
const asyncHandler = require("../middlewares/async-handler");

const fileUpload = require("express-fileupload")({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  // limits: { fileSize: 10 * 1024 * 1024 }, // limite de 5 Mo
  abortOnLimit: true,
});

// 🧑‍✈️ Admin global : voir tous les users
router.get(
  "/",
  auth,
  authorize(User, "index"),
  asyncHandler(UserController.index)
);

// 🧑‍✈️ Admin global : voir un user
router.get(
  "/:id",
  auth,
  authorize(User, "show"),
  asyncHandler(UserController.show)
);

// 👤 Un user peut modifier son propre profil (ou admin)
router.patch(
  "/:id",
  auth,
  authorize(User, "update"),
  fileUpload,
  asyncHandler(UserController.update)
);

// Admin global : créer un utilisateur
router.post(
  "/",
  auth,
  authorize(User, "create"),
  fileUpload,
  asyncHandler(UserController.create)
);

// Admin global : supprimer un utilisateur
router.delete(
  "/:id",
  auth,
  authorize(User, "delete"),
  asyncHandler(UserController.delete)
);

router.patch(
  "/:id/promote",
  auth,
  authorize(User, "promote"),
  asyncHandler(UserController.promote)
);

module.exports = router;
