const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRATION = "7d";

const roles = ["admin", "member"];

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    salt: { type: String, required: true },
    passwordHash: { type: String, required: true },
    token: { type: String },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    avatar: {
      public_id: String,
      secure_url: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password + this.salt, this.passwordHash);
};

// Génération du token JWT
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

UserSchema.methods.getGroups = async function () {
  const memberships = await mongoose
    .model("Membership")
    .find({ user: this._id })
    .populate("group");
  return memberships.map((m) => m.group);
};

module.exports = mongoose.model("User", UserSchema);
