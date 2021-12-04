import express from 'express';
import { logIn, signUp } from '../controller/users';
import { UserSchema } from '../dto/user';
import { validate } from '../middleware/validateRequest';

const router = express.Router();

router.post('/signup', validate(UserSchema), signUp);

router.post('/login', logIn);

export default router;
