const express = require("express");
const router = express.Router({ mergeParams: true });

const CategoryController = require("../../controllers/category_controller");
const Category = require("../../models/Category");

const auth = require("../../middlewares/auth_middleware");
const authorize = require("../../middlewares/authorize");
const asyncHandler = require("../../middlewares/async-handler");

// Lister toutes les catégories du groupe
router.get(
  "/",
  auth,
  authorize(Category, "index"),
  asyncHandler(CategoryController.index)
);

// Créer une nouvelle catégorie dans le groupe
router.post(
  "/",
  auth,
  authorize(Category, "create"),
  asyncHandler(CategoryController.create)
);

// Récupérer une catégorie précise
router.get(
  "/:id",
  auth,
  authorize(Category, "show"),
  asyncHandler(CategoryController.show)
);

// Modifier une catégorie
router.patch(
  "/:id",
  auth,
  authorize(Category, "update"),
  asyncHandler(CategoryController.update)
);

// Supprimer une catégorie
router.delete(
  "/:id",
  auth,
  authorize(Category, "delete"),
  asyncHandler(CategoryController.delete)
);

module.exports = router;
