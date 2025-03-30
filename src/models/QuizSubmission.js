const mongoose = require("mongoose");
const Question = require("./Question");
const checkAnswerCorrectness = require("../utils/check_answer_correctness");

const AnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  value: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const QuizSubmissionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

QuizSubmissionSchema.methods.sanitizeAnswers = function (quiz) {
  const allowedIds = new Set(quiz.questions.map((q) => q._id.toString()));
  const seen = new Set();

  const filtered = [];

  for (const answer of this.answers) {
    const qid = answer.question?.toString();
    if (!qid || !allowedIds.has(qid) || seen.has(qid)) continue;
    filtered.push(answer);
    seen.add(qid);
  }

  this.answers = filtered;
};

QuizSubmissionSchema.methods.handleCreate = async function () {
  const submission = this;

  if (!submission.answers?.length) {
    return;
  }

  const questionIds = submission.answers.map((a) => a.question);
  const questions = await Question.find({ _id: { $in: questionIds } });
  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

  for (const userAnswer of submission.answers) {
    const expectedQuestion = questionMap.get(userAnswer.question?.toString());

    if (!expectedQuestion) {
      continue;
    }

    const expectedAnswers = Array.from(
      expectedQuestion.answer?.values?.() || []
    );

    const isCorrect = expectedAnswers.some((expected) =>
      checkAnswerCorrectness(userAnswer.value, expected)
    );

    userAnswer.isCorrect = isCorrect;
  }

  await submission.save();
};

module.exports = mongoose.model("QuizSubmission", QuizSubmissionSchema);
