const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Emoji is required"],
      trim: true,
    },
    answer: {
      type: Map,
      of: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.get("en") && v.get("fr");
        },
        message: "Answer must be provided in English or French",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
