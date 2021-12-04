import { RequestHandler, Request, Response } from 'express';
import logger from '../config/winston';
import User from '../models/user';
import { compare, hash } from '../utils/encryptor';
import { jwtSign } from '../utils/jwtService';

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const hashedPassword = await hash(password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'The email has already been registered.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }

  const user = new User({
    userName,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();

    const token = jwtSign({ id: savedUser._id, userName, email });
    return res.status(200).json({ token, userName, email });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};

export const logIn: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(password);
    console.log(user);

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwtSign({
      id: user._id,
      userName: user.userName,
      email: user.email,
    });
    return res.status(200).json({ token, userName: user.userName, email });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};
