import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(entity: User): Promise<User> {
    if (entity.password) entity.hashPassword();

    const newEntity = await this.repository.save(entity);
    delete newEntity.password;

    return newEntity;
  }

  async update(entity: User, updateSet: UpdateUserDto): Promise<User> {
    const mergedEntity = this.repository.merge(entity, updateSet);

    if (updateSet.password) mergedEntity.hashPassword();

    const newEntity = await this.repository.save(mergedEntity);
    delete newEntity.password;

    return newEntity;
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
