const express = require("express");
const router = express.Router({ mergeParams: true });

const QuestionController = require("../../controllers/question_controller");
const Question = require("../../models/Question");

const auth = require("../../middlewares/auth_middleware");
const authorize = require("../../middlewares/authorize");
const asyncHandler = require("../../middlewares/async-handler");

// Lister les questions de la catégorie (appartiennent à l'user)
router.get(
  "/",
  auth,
  authorize(Question, "index"),
  asyncHandler(QuestionController.index)
);

// Créer une question dans cette catégorie
router.post(
  "/",
  auth,
  authorize(Question, "create"),
  asyncHandler(QuestionController.create)
);

// Voir une question spécifique (seulement si owner)
router.get(
  "/:id",
  auth,
  authorize(Question, "show"),
  asyncHandler(QuestionController.show)
);

// Modifier une question (si owner)
router.patch(
  "/:id",
  auth,
  authorize(Question, "update"),
  asyncHandler(QuestionController.update)
);

// Supprimer une question (si owner)
router.delete(
  "/:id",
  auth,
  authorize(Question, "delete"),
  asyncHandler(QuestionController.delete)
);

module.exports = router;
