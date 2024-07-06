import { UserEntity } from '../../entities/user/eneity';

import { RegisterUserDto } from './dto';

export type RegisterResult = RegisterUserDto;

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
};

export type DoesUsernameExistsResult = boolean;

export type FindUserByUsernameResult = UserEntity | null;
