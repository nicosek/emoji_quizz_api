const express = require("express");
const router = express.Router({ mergeParams: true });

const QuizSubmissionController = require("../../controllers/quiz_submission_controller");
const QuizSubmission = require("../../models/QuizSubmission");

const auth = require("../../middlewares/auth_middleware");
const authorize = require("../../middlewares/authorize");
const asyncHandler = require("../../middlewares/async-handler");

// Créer une soumission
router.post(
  "/",
  auth,
  authorize(QuizSubmission, "create"),
  asyncHandler(QuizSubmissionController.create)
);

// Voir toutes les soumissions (filtrables)
router.get(
  "/",
  auth,
  authorize(QuizSubmission, "index"),
  asyncHandler(QuizSubmissionController.index)
);

// Voir les soumissions d’un utilisateur donné
router.get(
  "/users/:userId",
  auth,
  authorize(QuizSubmission, "userSubmissions"),
  asyncHandler(QuizSubmissionController.userSubmissions)
);

// Voir une soumission spécifique
router.get(
  "/:id",
  auth,
  authorize(QuizSubmission, "show"),
  asyncHandler(QuizSubmissionController.show)
);

module.exports = router;
