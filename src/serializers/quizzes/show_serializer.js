const BaseQuizSerializer = require("./base_serializer");

class QuizShowSerializer extends BaseQuizSerializer {
  async serialize() {
    await this.quiz.populate("questions");

    const base = await super.serialize();

    return {
      ...base,
      questions: this.quiz.questions.map((q) => ({
        id: q._id,
        label: q.label,
      })),
    };
  }
}

module.exports = QuizShowSerializer;
