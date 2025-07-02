import type { Response } from 'express';

export const clearTokenFromCookies = (res: Response) => {
  console.log('clear cookies called');
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};
