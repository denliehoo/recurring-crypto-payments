import type { Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

import type { CustomRequest } from '../types/requests';
import { clearTokenFromCookies } from '@src/utility/cookies';

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // TODO: Change only to cookies once checkout and email verify has been updated
  const token = req.cookies?.token || req.headers.authorization;

  if (!token) {
    clearTokenFromCookies(res);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
    if (err) {
      clearTokenFromCookies(res);
      return res.sendStatus(401);
    }

    // if the current time is greater than the expiration time (meaning token expired, redirect to login)
    if (Math.floor(Date.now() / 1000) > decoded.exp) {
      clearTokenFromCookies(res);
      return res.status(401).json({ error: 'Token expired' });
    }

    req.decoded = decoded; // store the decoded token in the request object for later use
    next(); // move to the next middleware or the actual handler
  });
};
