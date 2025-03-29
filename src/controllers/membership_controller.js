const Membership = require("../models/Membership");
const User = require("../models/User");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const MembershipController = {
  // POST /groups/:groupId/members
  async create(req, res) {
    const { groupId, userId } = req.params;

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(null, { modelName: "User" });

    const existing = await Membership.findOne({ user: userId, group: groupId });
    if (existing) {
      throw new BadRequestError("User is already in the group");
    }

    const membership = await Membership.create({
      user: userId,
      group: groupId,
      role: "member",
    });

    res.status(201).json(membership);
  },

  // PATCH /groups/:groupId/members/:userId
  async update(req, res) {
    const { groupId, userId } = req.params;
    const { role } = req.body;

    const membership = await Membership.findOne({
      user: userId,
      group: groupId,
    });
    if (!membership) throw new NotFoundError(null, { modelName: "Membership" });

    if (role !== "admin" && role !== "member") {
      return res.status(400).json({ message: "Invalid role" });
    }

    membership.role = role;
    await membership.save();

    res.json(membership);
  },

  // DELETE /groups/:groupId/members/:userId
  async delete(req, res) {
    const { groupId, userId } = req.params;

    const membership = await Membership.findOne({
      user: userId,
      group: groupId,
    });
    if (!membership) throw new NotFoundError(null, { modelName: "Membership" });

    await membership.deleteOne();

    res.status(204).end();
  },
};

module.exports = MembershipController;
