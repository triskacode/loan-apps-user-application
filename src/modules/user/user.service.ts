import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = new User();

    entity.email = createUserDto.email;
    entity.password = createUserDto.password;
    entity.role = createUserDto.role;
    entity.state = createUserDto.state;

    return this.userRepository.create(entity);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.update(entity, updateUserDto);
  }

  async remove(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.delete(entity);
  }
}
