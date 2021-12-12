import { RequestHandler, Request, Response } from 'express';
import logger from '../config/winston';
import InvitationCode from '../models/invitationCode';
import User from '../models/user';
import { compare, hash } from '../utils/encryptor';
import { jwtSign } from '../utils/jwtService';

/**
 * POST api/users/signup
 * @param req
 * @param res
 * @returns
 */
export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { userName, email, password, invitationCode } = req.body;
  const hashedPassword = await hash(password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'The email has already been registered.',
      });
    }

    const code = await InvitationCode.findOne({ code: invitationCode });
    if (!code) {
      return res.status(400).json({ error: 'invalid code' });
    }
    code.used = true;
    await code.save();

    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    const token = jwtSign({ id: savedUser._id, userName, email });
    return res.status(200).json({ token, userName, email });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * POST api/users/login
 * @param req
 * @param res
 * @returns
 */
export const logIn: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

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
