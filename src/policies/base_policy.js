const Membership = require("../models/Membership");

class BasePolicy {
  constructor(req) {
    this.req = req;
    this.user = req.user;
    this.record = req.record || null;
    this.params = req.params;
    this.body = req.body;
  }

  isGlobalAdmin() {
    return this.user?.isAdmin === true;
  }

  async isGroupAdmin(groupId) {
    if (!this.user || !groupId) return false;

    return await Membership.exists({
      user: this.user._id,
      group: groupId,
      role: "admin",
    });
  }

  async isGroupMember(groupId) {
    if (!this.user || !groupId) return false;

    return await Membership.exists({
      user: this.user._id,
      group: groupId,
    });
  }

  isRecordOwner() {
    return (
      this.user &&
      this.record &&
      this.user._id.toString() === this.record.user.toString()
    );
  }

  isCreator() {
    return (
      this.user &&
      this.record &&
      this.user._id.toString() === this.record.creator.toString()
    );
  }
}

module.exports = BasePolicy;
