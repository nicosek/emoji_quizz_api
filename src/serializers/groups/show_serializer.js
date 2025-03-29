const UserBaseSerializer = require("../users/base_serializer");

class GroupShowSerializer {
  constructor(group) {
    this.group = group;
  }

  async serialize() {
    const memberships = await this.group.getMembershipsWithUsers();

    const members = memberships.map((m) => ({
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
