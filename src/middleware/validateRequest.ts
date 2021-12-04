import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const validate =
  (schema: yup.AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
