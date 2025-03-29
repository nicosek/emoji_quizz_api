const mongoose = require("mongoose");

const roles = ["admin", "member"];
const statuses = ["active", "invited", "rejected"];

const MembershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "member",
      required: true,
    },
  },
  { timestamps: true }
);

MembershipSchema.index({ user: 1, group: 1 }, { unique: true });

module.exports = mongoose.model("Membership", MembershipSchema);
