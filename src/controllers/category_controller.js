const Category = require("../models/Category");
const Question = require("../models/Question");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const CategoryController = {
  async index(req, res) {
    const categories = await Category.find({ group: req.params.groupId });
    res.json(categories);
  },

  async show(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(null, { modelName: "Category" });
    res.json(category);
  },

  async create(req, res) {
    const category = await Category.create({
      name: req.body.name,
      group: req.params.groupId,
    });
    res.status(201).json(category);
  },

  async update(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(null, { modelName: "Category" });

    if (req.body.name) category.name = req.body.name;
    await category.save();

    res.json(category);
  },

  async delete(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(null, { modelName: "Category" });

    const linkedQuestions = await Question.exists({ category: category._id });
    if (linkedQuestions) throw new BadRequestError("Category is not empty");

    await category.deleteOne();
    res.status(204).end();
  },
};

module.exports = CategoryController;
