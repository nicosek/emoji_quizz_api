const Question = require("../models/Question");
const { NotFoundError } = require("../utils/errors");

const QuestionController = {
  // GET /categories/:categoryId/questions
  async index(req, res) {
    const questions = await Question.find({
      category: req.params.categoryId,
      user: req.user._id,
    });

    res.json(questions);
  },

  // POST /categories/:categoryId/questions
  async create(req, res) {
    console.log(req.body);
    const question = await Question.create({
      category: req.params.categoryId,
      user: req.user._id,
      label: req.body.label,
      answer: req.body.answer,
    });

    res.status(201).json(question);
  },

  // GET /categories/:categoryId/questions/:id
  async show(req, res) {
    const question = await Question.findById(req.params.id);
    if (!question) throw new NotFoundError(null, { modelName: "Question" });

    res.json(question);
  },

  // PATCH /categories/:categoryId/questions/:id
  async update(req, res) {
    const question = await Question.findById(req.params.id);
    if (!question) throw new NotFoundError(null, { modelName: "Question" });

    if (req.body.label !== undefined) question.label = req.body.label;
    if (req.body.answers !== undefined) question.answers = req.body.answers;

    await question.save();
    res.json(question);
  },

  // DELETE /categories/:categoryId/questions/:id
  async delete(req, res) {
    const question = await Question.findById(req.params.id);
    if (!question) throw new NotFoundError(null, { modelName: "Question" });

    await question.deleteOne();
    res.status(204).end();
  },
};

module.exports = QuestionController;
