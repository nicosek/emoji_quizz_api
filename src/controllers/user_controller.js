const User = require("../models/User");
const UserBaseSerializer = require("../serializers/users/base_serializer");
const UserShowSerializer = require("../serializers/users/show_serializer");
// const UserCreateSerializer = require("../serializers/user_create_serializer");
// const UserUpdateSerializer = require("../serializers/user_update_serializer");

const { NotFoundError } = require("../utils/errors");
const { createWithParams, updateWithParams } = require("../services/users");

const UserController = {
  async index(req, res) {
    const users = await User.find();
    const data = users.map((user) => new UserBaseSerializer(user).serialize());
    res.json(data);
  },

  async show(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError(null, { modelName: "User" });

    const data = await new UserShowSerializer(user).serialize();
    res.json(data);
  },

  async create(req, res) {
    const user = await createWithParams(req.body, req.files?.avatar);
    const data = new UserBaseSerializer(user).serialize();
    res.status(201).json(data);
  },

  async update(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError(null, { modelName: "User" });

    await updateWithParams(user, req.body, req.files?.avatar);
    const data = new UserBaseSerializer(user).serialize();
    res.json(data);
  },

  async delete(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError(null, { modelName: "User" });

    if (user.avatar?.public_id) {
      await deleteImage(user.avatar.public_id);
    }

    await user.deleteOne();
    res.status(204).end();
  },

  async promote(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError(null, { modelName: "User" });

    user.isAdmin = !user.isAdmin;
    await user.save();

    const data = new UserBaseSerializer(user).serialize();
    res.json(data);
  },
};

module.exports = UserController;
