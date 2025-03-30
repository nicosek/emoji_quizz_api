const BaseUserSerializer = require("./base_serializer");

class UserShowSerializer extends BaseUserSerializer {
  constructor(user, memberships) {
    super(user);
    this.memberships = memberships;
  }

  serialize() {
    const baseData = super.serialize();

    const groups = this.memberships.map((m) => ({
      id: m.group._id,
      name: m.group.name,
    }));

    return {
      ...baseData,
      groups,
    };
  }
}

module.exports = UserShowSerializer;
