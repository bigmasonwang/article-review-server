import { RequestHandler, Request, Response } from 'express';
import crypto from 'crypto';
import InvitationCode from '../models/invitationCode';

/**
 * POST api/invitations
 * @param req
 * @param res
 * @returns
 */
export const createInvitations: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { number } = req.body;

  try {
    const returnArr = [];
    for (let index = 0; index < number; index++) {
      const randomString = crypto.randomBytes(8).toString('hex');
      const invitationCode = new InvitationCode({
        code: randomString,
        used: false,
      });
      await invitationCode.save();
      returnArr.push(randomString);
    }
    return res.status(201).json({ codes: returnArr });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
