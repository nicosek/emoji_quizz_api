const BasePolicy = require("./base_policy");

class MembershipPolicy extends BasePolicy {
  async create() {
    const groupId = this.params.groupId;
    return this.isGlobalAdmin() || (await this.isGroupAdmin(groupId));
  }

  async update() {
    const groupId = this.params.groupId;
    return this.isGlobalAdmin() || (await this.isGroupAdmin(groupId));
  }

  async delete() {
    const groupId = this.params.groupId;
    return this.isGlobalAdmin() || (await this.isGroupAdmin(groupId));
  }
}

module.exports = MembershipPolicy;
