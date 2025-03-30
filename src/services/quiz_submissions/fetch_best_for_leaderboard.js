const mongoose = require("mongoose");
const QuizSubmission = require("../../models/QuizSubmission");

const fetchBestForLeaderboard = async (quizId) => {
  const bestSubmissionIds = await QuizSubmission.aggregate([
    { $match: { quiz: new mongoose.Types.ObjectId(quizId) } },
    {
      $addFields: {
        score: {
          $size: {
            $filter: {
              input: "$answers",
              as: "a",
              cond: { $eq: ["$$a.isCorrect", true] },
            },
          },
        },
      },
    },
    { $sort: { score: -1, createdAt: 1 } },
    {
      $group: {
        _id: "$user",
        submissionId: { $first: "$_id" },
      },
    },
    {
      $replaceWith: { _id: "$submissionId" },
    },
  ]);

  const ids = bestSubmissionIds.map((s) => s._id);
  console.log("🏆 Best submission IDs:", ids);

  const submissions = await QuizSubmission.find({ _id: { $in: ids } }).populate(
    "user"
  );

  // On recalcule localement le score (car il n’est pas en base)
  submissions.forEach((s) => {
    s.score = s.answers.filter((a) => a.isCorrect).length;
  });

  submissions.sort((a, b) => b.score - a.score || a.createdAt - b.createdAt);

  return submissions;
};

module.exports = fetchBestForLeaderboard;
