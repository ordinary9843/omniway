import { randomBytes, scrypt as cryptoScrypt } from 'crypto';
import { promisify } from 'util';

import { GenerateSaltResult, HashPasswordResult } from './type';

const scrypt = promisify(cryptoScrypt);

export async function hashPassword(
  password: string,
  salt: string,
): Promise<HashPasswordResult> {
  const hashedPasswordBuffer = (await scrypt(password, salt, 64)) as Buffer;

  return hashedPasswordBuffer.toString('hex');
}

export function generateSalt(): GenerateSaltResult {
  return randomBytes(8).toString('hex');
}
