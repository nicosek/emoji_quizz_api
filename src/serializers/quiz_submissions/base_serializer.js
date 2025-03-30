class BaseSubmissionSerializer {
  constructor(submission) {
    this.submission = submission;
  }

  serialize() {
    return {
      id: this.submission._id,
      user: {
        id: this.submission.user._id,
        firstName: this.submission.user.firstName,
        lastName: this.submission.user.lastName,
      },
      quiz: {
        id: this.submission.quiz._id,
        title: this.submission.quiz.title,
      },
      score: this.submission.answers?.filter((a) => a.isCorrect).length || 0,
    };
  }
}

module.exports = BaseSubmissionSerializer;
