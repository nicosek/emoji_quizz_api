const Quiz = require("../models/Quiz");
const QuizSubmission = require("../models/QuizSubmission");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const BaseSubmissionSerializer = require("../serializers/quiz_submissions/base_serializer");
const ShowSubmissionSerializer = require("../serializers/quiz_submissions/show_serializer");

const QuizSubmissionController = {
  async create(req, res) {
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      throw new BadRequestError("Missing or invalid 'answers' field");
    }

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) throw new NotFoundError(null, { modelName: "Quiz" });

    const submission = new QuizSubmission({
      quiz: quiz._id,
      user: req.user._id,
      answers,
    });

    submission.sanitizeAnswers(quiz);
    await submission.save();
    await submission.handleCreate();

    await submission.populate([
      "user",
      "quiz",
      {
        path: "answers.question",
        select: "label",
      },
    ]);

    const data = await new ShowSubmissionSerializer(submission).serialize();
    res.json(data);
  },

  async show(req, res) {
    const submission = await QuizSubmission.findById(req.params.id).populate([
      "user",
      "quiz",
      {
        path: "answers.question",
        select: "label",
      },
    ]);

    if (!submission)
      throw new NotFoundError(null, { modelName: "QuizSubmission" });

    const data = await new ShowSubmissionSerializer(submission).serialize();
    res.json(data);
  },

  async index(req, res) {
    const { quizId } = req.params;

    const submissions = await QuizSubmission.find({ quiz: quizId })
      .populate(["user", "quiz"])
      .sort({ createdAt: 1 });

    const data = submissions.map((submission) =>
      new BaseSubmissionSerializer(submission).serialize()
    );

    res.json(data);
  },

  async userSubmissions(req, res) {
    const { quizId, userId } = req.params;

    const submissions = await QuizSubmission.find({
      quiz: quizId,
      user: userId,
    })
      .populate(["user", "quiz"])
      .sort({ createdAt: 1 });

    const data = submissions.map((submission) =>
      new BaseSubmissionSerializer(submission).serialize()
    );

    res.json(data);
  },
};

module.exports = QuizSubmissionController;
