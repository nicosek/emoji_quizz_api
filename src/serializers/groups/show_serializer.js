const UserBaseSerializer = require("../users/base_serializer");

class GroupShowSerializer {
  constructor(group, memberships) {
    this.group = group;
    this.memberships = memberships;
  }

  serialize() {
    const members = this.memberships.map((m) => ({
      ...new UserBaseSerializer(m.user).serialize(),
      role: m.role,
    }));

    return {
      id: this.group._id,
      name: this.group.name,
      members,
    };
  }
}

module.exports = GroupShowSerializer;
