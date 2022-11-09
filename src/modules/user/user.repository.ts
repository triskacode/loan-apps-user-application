import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(entity: User): Promise<User> {
    try {
      if (entity.password) entity.hashPassword();

      const newEntity = await this.repository.save(entity);
      delete newEntity.password;

      return newEntity;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
        throw new BadRequestException('User already exists');

      throw err;
    }
  }

  async update(entity: User, updateSet: Partial<User>): Promise<User> {
    try {
      entity.email = updateSet.email ?? entity.email;
      entity.password = updateSet.password ?? entity.password;
      entity.role = updateSet.role ?? entity.role;
      entity.state = updateSet.state ?? entity.state;

      if (updateSet.password) entity.hashPassword();

      const newEntity = await this.repository.save(entity);
      delete newEntity.password;

      return newEntity;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
        throw new BadRequestException('User already exists');

      throw err;
    }
  }

  async delete(entity: User): Promise<User> {
    await this.repository.delete(entity.id);

    return entity;
  }

  async findAll(skip = 0 as number, take = 10 as number): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .skip(skip)
      .take(take)
      .getMany();
  }

  async findById(id: User['id']): Promise<User> {
    return this.repository.createQueryBuilder('user').where({ id }).getOne();
  }

  async findByEmailWithPassword(email: User['email']): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }
}
