import '../config';

import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
};

export const typeormConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  ...config,
};

export default new DataSource({
  ...typeormConfig,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/*{.ts,.js}'],
});
