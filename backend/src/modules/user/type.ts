import { UserEntity } from '../../entities/user/eneity';

export type RegisterDto = {
  username: string;
  password: string;
};

export type RegisterResult = UserEntity;

export type DoesUsernameExistsResult = boolean;
