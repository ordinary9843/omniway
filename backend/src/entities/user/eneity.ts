import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TABLE_NAME } from './constant';

@Entity(TABLE_NAME)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password!: string;

  @Column({ type: 'char', length: 16, nullable: false })
  salt!: string;

  @Column({ type: 'bytea', nullable: true })
  avatar!: Buffer | null;

  @Column({ name: 'is_active', type: 'boolean', nullable: true })
  isActive!: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
