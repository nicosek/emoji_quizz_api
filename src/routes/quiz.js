const express = require("express");
const router = express.Router();

const QuizController = require("../controllers/quiz_controller");
const Quiz = require("../models/Quiz");

const auth = require("../middlewares/auth_middleware");
const authorize = require("../middlewares/authorize");
const asyncHandler = require("../middlewares/async-handler");

// GET /quizzes/:id
router.get(
  "/:id",
  auth,
  authorize(Quiz, "show"),
  asyncHandler(QuizController.show)
);

// PATCH /quizzes/:id
router.patch(
  "/:id",
  auth,
  authorize(Quiz, "update"),
  asyncHandler(QuizController.update)
);

// DELETE /quizzes/:id
router.delete(
  "/:id",
  auth,
  authorize(Quiz, "delete"),
  asyncHandler(QuizController.delete)
);

module.exports = router;
