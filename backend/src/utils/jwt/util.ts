import jwt from 'jsonwebtoken';

import { jwtConfig } from '../../configs/jwt/config';

import {
  GenerateAccessTokenResult,
  GenerateJwtTokenResult,
  GenerateRefreshTokenResult,
  GetJwtSecretResult,
  UserPayload,
  VerifyJwtTokenResult,
} from './type';

const getJwtSecret = (): GetJwtSecretResult => {
  if (!jwtConfig.secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return jwtConfig.secret;
};

const generateJwtToken = (
  userPayload: UserPayload,
  expiresIn = '1h',
): GenerateJwtTokenResult => {
  return jwt.sign(userPayload, getJwtSecret(), {
    expiresIn,
  });
};

export const generateAccessToken = (
  userPayload: UserPayload,
): GenerateAccessTokenResult => {
  return generateJwtToken(userPayload, '2m');
};

export const generateRefreshToken = (
  userPayload: UserPayload,
): GenerateRefreshTokenResult => {
  return generateJwtToken(userPayload, '5m');
};

export const verifyJwtToken = (token: string): VerifyJwtTokenResult => {
  return jwt.verify(token, getJwtSecret()) as UserPayload;
};
