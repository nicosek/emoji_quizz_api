const User = require("../../models/User");
const uid2 = require("uid2");
const bcrypt = require("bcryptjs");
const { uploadImage, deleteImage } = require("../../utils/cloudinary");

const createWithParams = async (params, file = null) => {
  const { email, password, firstName, lastName, isAdmin } = params;

  const salt = uid2(16);
  const passwordHash = bcrypt.hashSync(password + salt, 10);

  const user = new User({
    email,
    salt,
    passwordHash,
    firstName,
    lastName,
    isAdmin: !!isAdmin,
  });

  // Upload avatar si présent
  if (file?.tempFilePath) {
    try {
      const uploadedImage = await uploadImage(
        file,
        `emojiquizz/users/${user._id}`
      );
      user.avatar = uploadedImage;
    } catch (err) {
      console.error("⚠️ Avatar upload failed:", err.message);
    }
  }

  await user.save();
  return user;
};

const updateWithParams = async (user, params, file = null) => {
  const { firstName, lastName, password } = params;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;

  if (password) {
    const salt = uid2(16);
    user.salt = salt;
    user.passwordHash = bcrypt.hashSync(password + salt, 10);
  }

  if (file?.tempFilePath) {
    try {
      if (user.avatar?.public_id) {
        await deleteImage(user.avatar.public_id);
      }

      const uploadedImage = await uploadImage(
        file,
        `emojiquizz/users/${user._id}`
      );
      user.avatar = uploadedImage;
    } catch (err) {
      console.error("⚠️ Avatar update failed:", err.message);
    }
  }

  await user.save();
};

module.exports = {
  createWithParams,
  updateWithParams,
};
