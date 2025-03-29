const Group = require("../models/Group");
const { NotFoundError } = require("../utils/errors");

const GroupController = {
  async index(req, res) {
    const groups = await Group.find();
    res.json(groups);
  },

  async show(req, res) {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFoundError(null, { modelName: "Group" });
    res.json(group);
  },

  async create(req, res) {
    const group = await Group.create({ name: req.body.name });
    res.status(201).json(group);
  },

  async update(req, res) {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFoundError(null, { modelName: "Group" });

    if (req.body.name) group.name = req.body.name;

    await group.save();
    res.json(group);
  },

  async delete(req, res) {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFoundError(null, { modelName: "Group" });

    await group.deleteOne();
    res.status(204).end();
  },
};

module.exports = GroupController;
