import { Exclude, Expose } from 'class-transformer';

export class RegisterBodyDto {
  username!: string;
  password!: string;
  confirmPassword!: string;
}

export class RegisterUserDto {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Exclude()
  password!: string;

  @Exclude()
  salt!: string;

  @Expose()
  avatar!: Buffer | null;

  @Exclude()
  isActive: boolean = false;

  @Exclude()
  createdAt!: Date;

  @Exclude()
  updatedAt!: Date;
}

export class LoginBodyDto {
  username!: string;
  password!: string;
}

export class LoginUserDto {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;
}
