import { plainToClass } from 'class-transformer';

import { userRepository } from '../../../configs/di/config';
import { UserEntity } from '../../../entities/user/entity';
import { generateAccessToken, verifyJwtToken } from '../../../utils/jwt/util';
import { validatePassword } from '../../../utils/validator/util';
import { RegisterUserDto } from '../dto';
import UserService from '../service';

jest.mock('../../../configs/di/config', () => ({
  userRepository: {
    save: jest.fn(),
    findOne: jest.fn(),
  },
}));
jest.mock('../../../utils/crypto/util', () => ({
  generateSalt: jest.fn(() => 'mockedSalt'),
  hashPassword: jest.fn(() => 'mockedPassword'),
}));
jest.mock('../../../utils/jwt/util', () => ({
  generateAccessToken: jest.fn(() => 'mockedAccessToken'),
  generateRefreshToken: jest.fn(() => 'mockedRefreshToken'),
  verifyJwtToken: jest.fn(() => ({ identifier: 'mockedIdentifier' })),
}));
jest.mock('../../../utils/validator/util', () => ({
  validatePassword: jest.fn(() => true),
}));
jest.mock('class-transformer', () => ({
  plainToClass: jest.fn(),
  Expose: jest.fn(),
  Exclude: jest.fn(),
}));

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('register', () => {
    const registerBodyDto = {
      username: 'mockedUsername',
      password: 'mockedPassword',
      confirmPassword: 'mockedConfirmPassword',
    };
    const mockedUser = {
      username: 'mockedUsername',
      password: 'mockedPassword',
      salt: 'mockedSalt',
      isActive: true,
    };

    it('should register a user successfully', async () => {
      const userRepositorySaveSpy = userRepository.save as jest.Mock;
      const plainToClassSpy = plainToClass as jest.Mock;
      jest.spyOn(UserService, 'doesUsernameExists').mockResolvedValue(false);
      userRepositorySaveSpy.mockResolvedValue(mockedUser);
      plainToClassSpy.mockReturnValue(mockedUser);
      expect(await UserService.register(registerBodyDto)).toEqual(mockedUser);
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(mockedUser);
      expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
      expect(plainToClassSpy).toHaveBeenCalledWith(
        RegisterUserDto,
        mockedUser,
        { excludeExtraneousValues: true },
      );
      expect(plainToClassSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Create user failed', async () => {
      const userRepositorySaveSpy = userRepository.save as jest.Mock;
      jest.spyOn(UserService, 'doesUsernameExists').mockResolvedValue(false);
      userRepositorySaveSpy.mockResolvedValue(null);
      await expect(UserService.register(registerBodyDto)).rejects.toThrow(
        'Create user failed',
      );
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(mockedUser);
      expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if username already exists', async () => {
      jest.spyOn(UserService, 'doesUsernameExists').mockResolvedValue(true);
      await expect(UserService.register(registerBodyDto)).rejects.toThrow(
        'Username already exists',
      );
    });
  });

  describe('login', () => {
    const loginBodyDto = {
      username: 'mockedUsername',
      password: 'mockedPassword',
    };
    const mockedUser = {
      id: 1,
      username: 'mockedUsername',
      password: 'mockedPassword',
      salt: 'mockedSalt',
      avatar: null,
      isActive: true,
    } as UserEntity;

    it('should login a user successfully', async () => {
      jest
        .spyOn(UserService, 'findUserByUsername')
        .mockResolvedValue(mockedUser);
      expect(await UserService.login(loginBodyDto)).toEqual({
        accessToken: 'mockedAccessToken',
        refreshToken: 'mockedRefreshToken',
      });
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedUsername',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if username does not exist', async () => {
      jest.spyOn(UserService, 'findUserByUsername').mockResolvedValue(null);
      await expect(UserService.login(loginBodyDto)).rejects.toThrow(
        'Username does not exist',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedUsername',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if password does not match', async () => {
      const validatePasswordSpy = validatePassword as jest.Mock;
      jest
        .spyOn(UserService, 'findUserByUsername')
        .mockResolvedValue(mockedUser);
      validatePasswordSpy.mockReturnValue(false);
      await expect(UserService.login(loginBodyDto)).rejects.toThrow(
        'Password does not match',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedUsername',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
      expect(validatePasswordSpy).toHaveBeenCalledWith(
        'mockedPassword',
        'mockedPassword',
        'mockedSalt',
      );
      expect(validatePasswordSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('changePassword', () => {
    const payload = { identifier: 'mockedIdentifier' };
    const changePasswordBodyDto = {
      password: 'mockedPassword',
      newPassword: 'mockedNewPassword',
      confirmNewPassword: 'mockedConfirmNewPassword',
    };
    const mockedUser = {
      username: 'mockedUsername',
      password: 'mockedPassword',
      salt: 'mockedSalt',
    } as UserEntity;

    it('should change the user password successfully', async () => {
      const userRepositorySaveSpy = userRepository.save as jest.Mock;
      const validatePasswordSpy = validatePassword as jest.Mock;
      jest
        .spyOn(UserService, 'findUserByUsername')
        .mockResolvedValue(mockedUser);
      validatePasswordSpy.mockResolvedValue(true);
      userRepositorySaveSpy.mockResolvedValue(mockedUser);
      await UserService.changePassword(payload, changePasswordBodyDto);
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedIdentifier',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
      expect(validatePasswordSpy).toHaveBeenCalledWith(
        'mockedPassword',
        'mockedPassword',
        'mockedSalt',
      );
      expect(validatePasswordSpy).toHaveBeenCalledTimes(1);
      expect(userRepositorySaveSpy).toHaveBeenCalledWith({
        ...mockedUser,
        password: 'mockedPassword',
        salt: 'mockedSalt',
      });
      expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user does not exist', async () => {
      jest.spyOn(UserService, 'findUserByUsername').mockResolvedValue(null);
      await expect(
        UserService.changePassword(payload, changePasswordBodyDto),
      ).rejects.toThrow('User does not exist');
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedIdentifier',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if original password does not match', async () => {
      const validatePasswordSpy = validatePassword as jest.Mock;
      jest
        .spyOn(UserService, 'findUserByUsername')
        .mockResolvedValue(mockedUser);
      validatePasswordSpy.mockResolvedValue(false);
      await expect(
        UserService.changePassword(payload, changePasswordBodyDto),
      ).rejects.toThrow('Origin password do not match');
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(
        'mockedIdentifier',
      );
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
      expect(validatePasswordSpy).toHaveBeenCalledWith(
        'mockedPassword',
        'mockedPassword',
        'mockedSalt',
      );
      expect(validatePasswordSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateRefreshToken', () => {
    const validateRefreshTokenBodyDto = {
      refreshToken: 'mockedRefreshToken',
    };
    const mockedIdentifier = 'mockedIdentifier';

    it('should validate refresh token successfully', async () => {
      const verifyJwtTokenSpy = verifyJwtToken as jest.Mock;
      const generateAccessTokenSpy = generateAccessToken as jest.Mock;
      verifyJwtTokenSpy.mockReturnValue({
        identifier: mockedIdentifier,
      });
      generateAccessTokenSpy.mockReturnValue('mockedAccessToken');
      expect(
        await UserService.validateRefreshToken(validateRefreshTokenBodyDto),
      ).toEqual({
        accessToken: 'mockedAccessToken',
      });
      expect(verifyJwtTokenSpy).toHaveBeenCalledWith('mockedRefreshToken');
      expect(verifyJwtTokenSpy).toHaveBeenCalledTimes(1);
      expect(generateAccessTokenSpy).toHaveBeenCalledWith({
        identifier: mockedIdentifier,
      });
      expect(generateAccessTokenSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if refresh token verification fails', async () => {
      const verifyJwtTokenSpy = verifyJwtToken as jest.Mock;
      verifyJwtTokenSpy.mockReturnValue({ identifier: null });
      await expect(
        UserService.validateRefreshToken(validateRefreshTokenBodyDto),
      ).rejects.toThrow('Refresh token verification failed');
      expect(verifyJwtTokenSpy).toHaveBeenCalledWith('mockedRefreshToken');
      expect(verifyJwtTokenSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('doesUsernameExists', () => {
    const username = 'mockedUsername';
    const mockedUser = {
      username: 'mockedUsername',
      password: 'mockedPassword',
      salt: 'mockedSalt',
    } as UserEntity;

    it('should return true if username exists', async () => {
      jest
        .spyOn(UserService, 'findUserByUsername')
        .mockResolvedValue(mockedUser);
      expect(await UserService.doesUsernameExists(username)).toBeTruthy();
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(username);
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
    });

    it('should return false if username does not exist', async () => {
      jest.spyOn(UserService, 'findUserByUsername').mockResolvedValue(null);
      expect(await UserService.doesUsernameExists(username)).toBeFalsy();
      expect(UserService.findUserByUsername).toHaveBeenCalledWith(username);
      expect(UserService.findUserByUsername).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserByUsername', () => {
    const username = 'mockedUsername';
    const mockedUser = {
      username: 'mockedUsername',
      password: 'mockedPassword',
      salt: 'mockedSalt',
    } as UserEntity;

    it('should return user if found by username', async () => {
      const userRepositoryFindOneSpy = userRepository.findOne as jest.Mock;
      userRepositoryFindOneSpy.mockResolvedValue(mockedUser);
      expect(await UserService.findUserByUsername(username)).toEqual(
        mockedUser,
      );
      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: { username },
      });
      expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should return null if user is not found by username', async () => {
      const userRepositoryFindOneSpy = userRepository.findOne as jest.Mock;
      userRepositoryFindOneSpy.mockResolvedValue(null);
      expect(await UserService.findUserByUsername(username)).toBeNull();
      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: { username },
      });
      expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    });
  });
});
