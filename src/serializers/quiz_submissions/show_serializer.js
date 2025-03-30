const BaseSubmissionSerializer = require("./base_serializer");

class ShowSubmissionSerializer extends BaseSubmissionSerializer {
  serialize() {
    const base = super.serialize();

    const answers = this.submission.answers.map((a) => ({
      questionId: a.question._id,
      questionLabel: a.question.label,
      value: a.value,
      isCorrect: a.isCorrect,
    }));

    return {
      ...base,
      answers,
    };
  }
}

module.exports = ShowSubmissionSerializer;
