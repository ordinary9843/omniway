import UserModel from '../../models/user/model';

export type RegisterDto = {
  username: string;
  password: string;
};

export type RegisterResult = UserModel;

export type DoesUsernameExistsResult = boolean;
