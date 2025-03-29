const BasePolicy = require("./base_policy");

class UserPolicy extends BasePolicy {
  index() {
    return this.isGlobalAdmin();
  }

  show() {
    return this.isGlobalAdmin() || this.isSelf;
  }

  create() {
    return this.isGlobalAdmin();
  }

  update() {
    return this.isGlobalAdmin() || this.isSelf();
  }

  delete() {
    return this.isGlobalAdmin();
  }

  promote() {
    return this.isGlobalAdmin();
  }

  isSelf() {
    return (
      this.user &&
      this.record &&
      this.user._id.toString() === this.record._id.toString()
    );
  }
}

module.exports = UserPolicy;
