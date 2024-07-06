import jwt from 'jsonwebtoken';

import {
  GenerateAccessTokenResult,
  GenerateJwtTokenResult,
  GenerateRefreshTokenResult,
  GetJwtSecretResult,
  Payload,
  VerifyJwtTokenResult,
} from './type';

function getJwtSecret(): GetJwtSecretResult {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return jwtSecret;
}

function generateJwtToken(
  payload: Payload,
  expiresIn = '1h',
): GenerateJwtTokenResult {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
}

export function generateAccessToken(
  payload: Payload,
): GenerateAccessTokenResult {
  return generateJwtToken(payload, '2m');
}

export function generateRefreshToken(
  payload: Payload,
): GenerateRefreshTokenResult {
  return generateJwtToken(payload, '5m');
}

export function verifyJwtToken(token: string): VerifyJwtTokenResult {
  return jwt.verify(token, getJwtSecret()) as Payload;
}
