class BaseUserSerializer {
  constructor(user) {
    this.user = user;
  }

  serialize() {
    return {
      id: this.user._id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      avatar: this.user.avatar || null,
    };
  }
}

module.exports = BaseUserSerializer;
