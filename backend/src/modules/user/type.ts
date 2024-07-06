import { UserEntity } from '../../entities/user/entity';

import { RegisterUserDto } from './dto';

export type RegisterResult = RegisterUserDto;

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
};

export type ChangePasswordResult = void;

export type ValidateRefreshTokenResult = {
  accessToken: string;
};

export type DoesUsernameExistsResult = boolean;

export type FindUserByUsernameResult = UserEntity | null;
