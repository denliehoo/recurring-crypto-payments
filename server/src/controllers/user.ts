import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import {
  comparePasswords,
  hashPassword,
  validatePasswordStrength,
} from "../utility/credentials";
import { findUserByEmail, findUserById } from "../utility/findFromDb";
const jwt = require("jsonwebtoken");

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = "sk-" + uuidv4() + uuidv4() + uuidv4();

    if (!email || !password)
      return res.status(400).json({ error: "Cannot be empty" });

    const isValidPassword = validatePasswordStrength(password);
    if (!isValidPassword)
      return res.status(400).json({
        error:
          "Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character",
      });

    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const user: IUser = await User.create({
      name,
      email,
      apiKey,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve all users from the database
    const users: IUser[] = await User.find();

    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: "User not found" });

  const isCorrectPassword = await comparePasswords(password, user.password); // true or false
  if (!isCorrectPassword)
    return res.status(400).json({ error: "Incorrect Password" });

  const token = generateJWT(email);
  return res.send({ token: token });
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.send(user);
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await findUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.send(user);
};

const generateJWT = (email: string) => {
  // Set the expiration time for the JWT token (e.g., 1 hour from now)
  // if want to change the time, change the 3600 (which is 60s * 60 min = 3600s = 1 hr)
  // const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)

  const token = jwt.sign(
    { email: email, exp: expirationTime },
    process.env.JWT_KEY
  );
  return token;
};
