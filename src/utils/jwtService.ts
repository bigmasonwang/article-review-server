import jwt, { Secret } from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  id: string;
  role?: string;
}

/**
 * sign jwt
 * @param payload includes user's id and role
 * @returns generated token
 */
export const jwtSign = (payload: JwtPayload): string => {
  const jwtSecret = process.env.JWT_SECRET as Secret;
  const jwtExpires = process.env.JWT_EXPIRES_IN || '30d';
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpires,
  });
  return token;
};

/**
 * verify jwt
 * @param token to be verified
 * @returns
 */
export const jwtVerify = (token: string): JwtPayload | null => {
  const jwtSecret = process.env.JWT_SECRET as Secret;
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (e) {
    return null;
  }
  return payload;
};
