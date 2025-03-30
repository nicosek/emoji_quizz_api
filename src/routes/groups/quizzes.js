const express = require("express");
const router = express.Router({ mergeParams: true });

const QuizController = require("../../controllers/quiz_controller");
const Quiz = require("../../models/Quiz");

const auth = require("../../middlewares/auth_middleware");
const authorize = require("../../middlewares/authorize");
const asyncHandler = require("../../middlewares/async-handler");

// GET /groups/:groupId/quizzes
router.get(
  "/",
  auth,
  authorize(Quiz, "index"),
  asyncHandler(QuizController.index)
);

// POST /groups/:groupId/quizzes
router.post(
  "/",
  auth,
  authorize(Quiz, "create"),
  asyncHandler(QuizController.create)
);

module.exports = router;
