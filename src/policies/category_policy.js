const BasePolicy = require("./base_policy");

class CategoryPolicy extends BasePolicy {
  async index() {
    return this.isGroupMember(this.params.groupId);
  }

  async create() {
    return this.isGroupMember(this.params.groupId);
  }

  async show() {
    return this.isGroupMember(this.record?.group);
  }

  async update() {
    return this.isGroupMember(this.record?.group);
  }

  async delete() {
    return this.isGroupMember(this.record?.group);
  }
}

module.exports = CategoryPolicy;
