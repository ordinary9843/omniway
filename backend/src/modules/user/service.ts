import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';

import { userRepository } from '../../configs/di/config';

import { generateSalt, hashPassword } from '../../utils/password/util';

import { RegisterBodyDto, RegisterUserDto } from './dto';
import { DoesUsernameExistsResult, RegisterResult } from './type';

class UserService {
  async register(registerBodyDto: RegisterBodyDto): Promise<RegisterResult> {
    const { username, password } = registerBodyDto;
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

    return plainToClass(RegisterUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async doesUsernameExists(
    username: string,
  ): Promise<DoesUsernameExistsResult> {
    return !isEmpty(await userRepository.findOne({ where: { username } }));
  }
}

export default new UserService();
