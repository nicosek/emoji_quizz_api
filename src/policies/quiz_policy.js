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

    const inGroup = await this.isGroupMember(this.record.group);
    return inGroup && this.record.started();
  }

  async update() {
    if (!this.record) return false;

    return this.record.isOwnedBy(this.user) && !this.record.started();
  }

  async delete() {
    return this.update();
  }

  async leaderboard() {
    return this.show();
  }
}

module.exports = QuizPolicy;
