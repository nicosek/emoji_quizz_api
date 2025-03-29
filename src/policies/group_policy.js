const BasePolicy = require("./base_policy");
const Membership = require("../models/Membership");

class GroupPolicy extends BasePolicy {
  index() {
    return this.isGlobalAdmin();
  }

  show() {
    return this.isGlobalAdmin();
  }

  create() {
    return this.isGlobalAdmin();
  }

  async update() {
    if (this.isGlobalAdmin()) return true;
    if (!this.user || !this.record) return false;

    const membership = await Membership.findOne({
      user: this.user._id,
      group: this.record._id,
      role: "admin",
    });

    return !!membership;
  }

  delete() {
    return this.isGlobalAdmin();
  }
}

module.exports = GroupPolicy;
