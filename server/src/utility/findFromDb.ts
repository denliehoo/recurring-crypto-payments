import models from "../models";
const { User } = models;

const findUserByEmail = async (email: string) => {
  try {
    const user = await User.find({ email: email });
    return user[0];
  } catch {
    return null;
  }
};

const findUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch {
    return null;
  }
};

export { findUserByEmail, findUserById };
