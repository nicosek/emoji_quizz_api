const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startAt: {
      type: Date,
      required: [true, "Start date and time are required"],
    },
    endAt: {
      type: Date,
      required: [true, "End date and time are required"],
      validate: {
        validator: function (v) {
          return !this.startAt || v > this.startAt;
        },
        message: "End datetime must be after start datetime",
      },
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
