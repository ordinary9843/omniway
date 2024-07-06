import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../entities/user/eneity';

import dataSource from '../typeorm/config';

import { InitializeDatabaseResult, InitializeRepositoriesResult } from './type';

let userRepository: Repository<UserEntity>;

function initializeRepositories(
  dataSource: DataSource,
): InitializeRepositoriesResult {
  userRepository = dataSource.getRepository(UserEntity);
}

export async function initializeDatabase(): Promise<InitializeDatabaseResult> {
  await dataSource.initialize();
  initializeRepositories(dataSource);

  return dataSource;
}

export { userRepository };
