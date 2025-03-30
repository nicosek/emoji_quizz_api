const BaseQuizSerializer = require("./base_serializer");

class QuizShowSerializer extends BaseQuizSerializer {
  serialize() {
    const base = super.serialize();
    console.log(this.quiz.questions[0]);

    return {
      ...base,
      questions: this.quiz.questions.map((q) => ({
        id: q._id,
        label: q.label,
        categoryName: q.category?.name,
      })),
    };
  }
}

module.exports = QuizShowSerializer;
