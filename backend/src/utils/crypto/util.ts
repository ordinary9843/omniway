import { randomBytes, createHmac } from 'crypto';

import { GenerateSaltResult, HashPasswordResult } from './type';

export const hashPassword = (
  password: string,
  salt: string,
): HashPasswordResult => {
  return createHmac('sha256', salt).update(password).digest('hex');
};

export const generateSalt = (): GenerateSaltResult => {
  return randomBytes(8).toString('hex');
};
