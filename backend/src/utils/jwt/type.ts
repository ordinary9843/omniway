import { JwtPayload } from 'jsonwebtoken';

export type Payload = JwtPayload & {
  identifier?: string;
};

export type GetJwtSecretResult = string;

export type GenerateJwtTokenResult = string;

export type GenerateAccessTokenResult = string;

export type GenerateRefreshTokenResult = string;

export type VerifyJwtTokenResult = Payload;
