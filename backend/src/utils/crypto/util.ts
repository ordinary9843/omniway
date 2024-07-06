import { randomBytes, createHmac } from 'crypto';

import { GenerateSaltResult, HashPasswordResult } from './type';

export async function hashPassword(
  password: string,
  salt: string,
): Promise<HashPasswordResult> {
  return createHmac('sha256', salt).update(password).digest('hex');
}

export function generateSalt(): GenerateSaltResult {
  return randomBytes(8).toString('hex');
}
