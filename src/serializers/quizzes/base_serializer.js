class BaseQuizSerializer {
  constructor(quiz) {
    this.quiz = quiz;
  }

  async serialize() {
    await this.quiz.populate(["creator", "group"]);

    return {
      id: this.quiz._id,
      title: this.quiz.title,
      description: this.quiz.description,
      startAt: this.quiz.startAt,
      endAt: this.quiz.endAt,
      creator: {
        firstName: this.quiz.creator.firstName,
        lastName: this.quiz.creator.lastName,
        id: this.quiz.creator._id,
      },
      group: {
        id: this.quiz.group._id,
        name: this.quiz.group.name,
      },
    };
  }
}

module.exports = BaseQuizSerializer;
