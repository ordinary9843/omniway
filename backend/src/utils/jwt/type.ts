import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  identifier: string;
}

export type GetJwtSecretResult = string;

export type GenerateJwtTokenResult = string;

export type GenerateAccessTokenResult = string;

export type GenerateRefreshTokenResult = string;

export type VerifyJwtTokenResult = UserPayload;
