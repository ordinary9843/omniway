import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';

import { userRepository } from '../../configs/di/config';

import { generateSalt, hashPassword } from '../../utils/crypto/util';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyJwtToken,
} from '../../utils/jwt/util';
import { validatePassword } from '../../utils/validator/util';

import {
  LoginBodyDto,
  RegisterBodyDto,
  RegisterUserDto,
  ValidateRefreshTokenBodyDto,
} from './dto';
import {
  DoesUsernameExistsResult,
  FindUserByUsernameResult,
  LoginResult,
  RegisterResult,
  ValidateRefreshTokenResult,
} from './type';

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

  async login(loginBodyDto: LoginBodyDto): Promise<LoginResult> {
    const { username, password } = loginBodyDto;
    const existUser = await this.findUserByUsernameResult(username);
    if (isEmpty(existUser)) {
      throw new Error('Username does not exist');
    } else if (
      !(await validatePassword(password, existUser.password, existUser.salt))
    ) {
      throw new Error('Password does not match');
    }

    const payload = { identifier: existUser.username };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }

  async validateRefreshToken(
    validateRefreshTokenBodyDto: ValidateRefreshTokenBodyDto,
  ): Promise<ValidateRefreshTokenResult> {
    const { refreshToken } = validateRefreshTokenBodyDto;
    const { identifier = null } = verifyJwtToken(refreshToken);
    if (!identifier) {
      throw new Error('Refresh token verification failed');
    }

    return {
      accessToken: generateAccessToken({
        identifier,
      }),
    };
  }

  async doesUsernameExists(
    username: string,
  ): Promise<DoesUsernameExistsResult> {
    return !isEmpty(await this.findUserByUsernameResult(username));
  }

  async findUserByUsernameResult(
    username: string,
  ): Promise<FindUserByUsernameResult> {
    return await userRepository.findOne({ where: { username } });
  }
}

export default new UserService();
