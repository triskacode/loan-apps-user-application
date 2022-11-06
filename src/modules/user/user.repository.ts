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

    return this.repository.save(entity);
  }

  async update(entity: User, updateSet: UpdateUserDto): Promise<User> {
    const mergedEntity = this.repository.merge(entity, updateSet);

    if (updateSet.password) mergedEntity.hashPassword();

    return this.repository.save(mergedEntity);
  }

  async delete(entity: User): Promise<User> {
    return this.repository.remove(entity);
  }

  async findAll(skip = 0 as number, take = 10 as number): Promise<User[]> {
    return this.repository.find({
      skip,
      take,
    });
  }

  async findById(id: User['id']): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }
}
