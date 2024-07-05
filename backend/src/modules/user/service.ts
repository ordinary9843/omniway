import { isEmpty } from 'lodash';

import { UserModel } from '../../models/user/model';

import { generateSalt, hashPassword } from '../../utils/password/util';

import { DoesUsernameExistsResult, RegisterDto, RegisterResult } from './type';

class UserService {
  async register(registerDto: RegisterDto): Promise<RegisterResult> {
    const { username, password } = registerDto;
    if (await this.doesUsernameExists(username)) {
      throw new Error('Username already exists');
    }

    const salt = generateSalt();

    return await UserModel.create({
      username,
      password: await hashPassword(password, salt),
      salt,
      isActive: true,
    });
  }

  async doesUsernameExists(
    username: string,
  ): Promise<DoesUsernameExistsResult> {
    return !isEmpty(await UserModel.findOne({ where: { username } }));
  }
}

export default new UserService();
