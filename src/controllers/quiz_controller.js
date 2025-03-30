const Quiz = require("../models/Quiz");
const { NotFoundError } = require("../utils/errors");
const QuizIndexSerializer = require("../serializers/quizzes/index_serializer");
const QuizShowSerializer = require("../serializers/quizzes/show_serializer");
const QuizShowWithAnswersSerializer = require("../serializers/quizzes/show_with_answers_serializer");

const QuizController = {
  // GET /groups/:groupId/quizzes
  async index(req, res) {
    const quizzes = await Quiz.find({ group: req.params.groupId });

    const serialized = await Promise.all(
      quizzes.map((quiz) => new QuizIndexSerializer(quiz).serialize())
    );

    res.json(serialized);
  },

  // POST /groups/:groupId/quizzes
  async create(req, res) {
    const quiz = await Quiz.create({
      group: req.params.groupId,
      creator: req.user._id,
      title: req.body.title,
      questions: req.body.questions,
      startAt: req.body.startAt,
      endAt: req.body.endAt,
    });

    const data = await new QuizShowWithAnswersSerializer(quiz).serialize();
    res.json(data);
  },

  // GET /quizzes/:id
  async show(req, res) {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) throw new NotFoundError(null, { modelName: "Quiz" });

    const SerializerClass = quiz.shouldShowAnswersTo(req.user)
      ? QuizShowWithAnswersSerializer
      : QuizShowSerializer;

    const data = await new SerializerClass(quiz).serialize();
    res.json(data);
  },

  // PATCH /quizzes/:id
  async update(req, res) {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) throw new NotFoundError(null, { modelName: "Quiz" });

    if (req.body.title !== undefined) quiz.title = req.body.title;
    if (req.body.questions !== undefined) quiz.questions = req.body.questions;
    if (req.body.startAt !== undefined) quiz.startAt = req.body.startAt;
    if (req.body.endAt !== undefined) quiz.endAt = req.body.endAt;

    await quiz.save();

    const data = await new QuizShowWithAnswersSerializer(quiz).serialize();
    res.json(data);
  },

  // DELETE /quizzes/:id
  async delete(req, res) {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) throw new NotFoundError(null, { modelName: "Quiz" });

    await quiz.deleteOne();
    res.status(204).end();
  },
};

module.exports = QuizController;
