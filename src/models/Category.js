const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true }
);

// Unicité du nom de catégorie dans le scope du group
CategorySchema.index({ group: 1, name: 1 }, { unique: true });

CategorySchema.methods.getQuestions = async function () {
  return mongoose.model("Question").find({ category: this._id });
};

module.exports = mongoose.model("Category", CategorySchema);
