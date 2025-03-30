const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uid2 = require("uid2");
const UserShowSerializer = require("../serializers/users/show_serializer");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");
const Membership = require("../models/Membership");

const AuthController = {
  // 🔑 Inscription
  signup: async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    // 🔍 Vérification des champs requis
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");

    if (missingFields.length > 0) {
      return next(
        new BadRequestError(
          `Missing required fields: ${missingFields.join(", ")}`
        )
      );
    }

    // 📌 Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ConflictError("Email already in use"));
    }

    // 🔑 Génération du salt et hash du mot de passe
    const salt = uid2(16);
    const passwordHash = bcrypt.hashSync(password + salt, 10);

    // 🔑 Création de l'utilisateur
    const newUser = new User({
      email,
      firstName,
      lastName,
      salt,
      passwordHash,
    });
    await newUser.save();

    const memberships = await Membership.find({ user: newUser._id }).populate(
      "group",
      "name"
    );

    // 🎯 Réponse optimisée
    res.status(201).json({
      _id: newUser._id,
      token: newUser.generateToken(),
      user: new UserShowSerializer(newUser, memberships).serialize(),
    });
  },

  // 🔐 Connexion
  login: async (req, res, next) => {
    const { email, password } = req.body;

    // 🔍 Vérification des champs requis
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return next(
        new BadRequestError(
          `Missing required fields: ${missingFields.join(", ")}`
        )
      );
    }

    // 📌 Récupération de l'utilisateur
    const user = await User.findOne({ email });
    const memberships = await Membership.find({ user: user._id }).populate(
      "group",
      "name"
    );

    if (!user) {
      return next(new NotFoundError(null, { modelName: "User" }));
    }

    if (!bcrypt.compareSync(password + user.salt, user.passwordHash)) {
      return next(new UnauthorizedError("Invalid credentials"));
    }

    // 🎯 Réponse optimisée
    res.status(200).json({
      _id: user._id,
      token: user.generateToken(),
      user: new UserShowSerializer(user, memberships).serialize(),
    });
  },
};

module.exports = AuthController;
