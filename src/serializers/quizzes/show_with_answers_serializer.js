const QuizShowSerializer = require("./show_serializer");

class QuizShowWithAnswersSerializer extends QuizShowSerializer {
  serialize() {
    const base = super.serialize();

    return {
      ...base,
      questions: this.quiz.questions.map((q) => ({
        id: q._id,
        label: q.label,
        answer: q.answer,
      })),
    };
  }
}

module.exports = QuizShowWithAnswersSerializer;
