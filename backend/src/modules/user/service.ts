import { isEmpty } from 'lodash';

import { userRepository } from '../../configs/di/config';

import { generateSalt, hashPassword } from '../../utils/password/util';

import { DoesUsernameExistsResult, RegisterDto, RegisterResult } from './type';

class UserService {
  async register(registerDto: RegisterDto): Promise<RegisterResult> {
    const { username, password } = registerDto;
    if (await this.doesUsernameExists(username)) {
      throw new Error('Username already exists');
    }

    const salt = generateSalt();
    const user = await userRepository.save({
      username,
      password: await hashPassword(password, salt),
      salt,
      isActive: true,
    });
    if (isEmpty(user)) {
      throw new Error('Create user failed');
    }

    return user;
  }

  async doesUsernameExists(
    username: string,
  ): Promise<DoesUsernameExistsResult> {
    return !isEmpty(await userRepository.findOne({ where: { username } }));
  }
}

export default new UserService();
