import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole, UserState } from '../user.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role?: UserRole;

  @Column({ enum: UserState, default: UserState.CREATED })
  state?: UserState;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
