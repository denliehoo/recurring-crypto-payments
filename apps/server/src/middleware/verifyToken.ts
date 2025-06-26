import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import type { CustomRequest } from '../types/requests';
import { clearTokenFromCookies } from '@src/utility/cookies';
import { DOMAIN_TOKEN_MAPPING, type ESubdomain } from '@src/constants/cookies';

const getToken = (req: CustomRequest) => {
  const origin = req.headers.origin;
  const parsedUrl = new URL(origin || '');
  const hostname = parsedUrl.hostname;
  const subdomain = hostname.split('.')[0] as ESubdomain;

  const tokenName = DOMAIN_TOKEN_MAPPING[subdomain];

  // TODO: Change only to cookies once checkout and email verify has been updated
  const cookieToken = req.cookies?.[tokenName];

  if (cookieToken) {
    return cookieToken;
  }
  return req.headers.authorization;
};

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req);

  if (!token) {
    clearTokenFromCookies(res);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <TODO: FIx>
  jwt.verify(token, process.env.JWT_KEY || '', (err: unknown, decoded: any) => {
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
