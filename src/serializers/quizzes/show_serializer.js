const BaseQuizSerializer = require("./base_serializer");

class QuizShowSerializer extends BaseQuizSerializer {
  serialize() {
    const base = super.serialize();

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
