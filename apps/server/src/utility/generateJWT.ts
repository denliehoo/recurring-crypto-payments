import jwt from 'jsonwebtoken';

export const generateJWT = (
  data: Record<string, unknown>,
  expirationInSeconds = 3155693000, // if not specific, this amt of seconds is 100 years (meaning doesnt expire)
) => {
  // Set the expiration time for the JWT token (e.g., 1 hour from now)
  // if want to change the time, change the 3600 (which is 60s * 60 min = 3600s = 1 hr)
  // const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)
  const expirationTime = Math.floor(Date.now() / 1000) + expirationInSeconds; // 100 hour (in seconds) temp put this as 10 hrs for testing

  const token = jwt.sign(
    { ...data, exp: expirationTime },
    process.env.JWT_KEY || '',
  );
  return token;
};
