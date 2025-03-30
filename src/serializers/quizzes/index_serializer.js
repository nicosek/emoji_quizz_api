const BaseQuizSerializer = require("./base_serializer");

class QuizIndexSerializer extends BaseQuizSerializer {
  async serialize() {
    const base = await super.serialize();

    return {
      ...base,
      questionCount: this.quiz.questions?.length || 0,
    };
  }
}

module.exports = QuizIndexSerializer;
