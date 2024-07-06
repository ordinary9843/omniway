import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../entities/user/entity';

import dataSource from '../typeorm/config';

import { InitializeDatabaseResult, InitializeRepositoriesResult } from './type';

let userRepository: Repository<UserEntity>;

const initializeRepositories = (
  dataSource: DataSource,
): InitializeRepositoriesResult => {
  userRepository = dataSource.getRepository(UserEntity);
};

export const initializeDatabase =
  async (): Promise<InitializeDatabaseResult> => {
    await dataSource.initialize();
    initializeRepositories(dataSource);

    return dataSource;
  };

export { userRepository };
