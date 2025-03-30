const BasePolicy = require("./base_policy");

class QuizPolicy extends BasePolicy {
  async index() {
    return this.isGroupMember(this.params.groupId);
  }

  async create() {
    return this.isGroupMember(this.params.groupId);
  }

  async show() {
    if (!this.record) return false;
    if (this.record.isOwnedBy(this.user)) return true;

    return new Date() >= this.record.startAt;
  }

  update() {
    if (!this.record) return false;
    console.log(new Date() < this.record.endAt);

    return this.record.isOwnedBy(this.user) && new Date() < this.record.endAt;
  }

  delete() {
    return this.update();
  }
}

module.exports = QuizPolicy;
