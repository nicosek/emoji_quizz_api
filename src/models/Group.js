const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

GroupSchema.methods.getMembers = async function () {
  const memberships = await mongoose
    .model("Membership")
    .find({ group: this._id })
    .populate("user");
  return memberships.map((m) => m.user);
};

module.exports = mongoose.model("Group", GroupSchema);
