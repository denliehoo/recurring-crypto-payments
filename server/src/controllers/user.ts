import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Create the user in the database
    const user: IUser = await User.create({ name, email });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve all users from the database
    const users: IUser[] = await User.find();

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};
