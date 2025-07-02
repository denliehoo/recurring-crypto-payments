const bcrypt = require('bcrypt');

const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch {
    throw new Error('Error hashing password');
  }
};

const comparePasswords = async (password: string, hash: string) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch {
    throw new Error('Error comparing passwords');
  }
};

// 8 chars, alphanumeric with at least 1 caps, small and special char
const validatePasswordStrength = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return passwordRegex.test(password);
};

export { hashPassword, comparePasswords, validatePasswordStrength };
