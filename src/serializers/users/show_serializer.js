const BaseUserSerializer = require("./base_serializer");
const Membership = require("../../models/Membership");

class UserShowSerializer extends BaseUserSerializer {
  async serialize() {
    console.log("User in serializer:", this.user);
    const baseData = super.serialize();
    console.log("Base data:", baseData);

    const memberships = await Membership.find({ user: this.user._id }).populate(
      "group",
      "name"
    );

    const groups = memberships.map((m) => ({
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
