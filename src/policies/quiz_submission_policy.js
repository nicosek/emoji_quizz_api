const BasePolicy = require("./base_policy");
const Quiz = require("../models/Quiz");

class QuizSubmissionPolicy extends BasePolicy {
  async create() {
    const quiz = await Quiz.findById(this.params.quizId);
    if (!quiz) return false;

    if (quiz.isOwnedBy(this.user)) return false;
    return quiz.started() && !quiz.ended();
  }

  async index() {
    const quiz = await Quiz.findById(this.params.quizId);
    if (!quiz) return false;

    if (!quiz.ended()) {
      return quiz.isOwnedBy(this.user);
    }

    return this.isGroupMember(quiz.group);
  }

  async userSubmissions() {
    const quiz = await Quiz.findById(this.params.quizId);
    if (!quiz) return false;

    if (!quiz.ended()) {
      return this.isRecordOwner() || quiz.isOwnedBy(this.user);
    }

    return this.isGroupMember(quiz.group);
  }

  async show() {
    const quiz = await Quiz.findById(this.record.quiz);
    if (!quiz) return false;

    if (!quiz.ended()) {
      return this.isRecordOwner() || quiz.isOwnedBy(this.user);
    }

    return this.isGroupMember(quiz.group);
  }
}

module.exports = QuizSubmissionPolicy;
