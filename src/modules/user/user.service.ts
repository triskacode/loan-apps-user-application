import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserState } from './user.types';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private accountService: AccountService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = new User();

    entity.email = createUserDto.email;
    entity.password = createUserDto.password;
    entity.role = createUserDto.role;
    entity.state = UserState.CREATED;

    return this.userRepository.create(entity);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.update(entity, updateUserDto);
  }

  async activate(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    const result = await this.userRepository.update(entity, {
      state: UserState.ACTIVE,
    });
    this.accountService.emitUserActivated(result);

    return result;
  }

  async suspend(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.update(entity, { state: UserState.SUSPENDED });
  }

  async softDelete(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.update(entity, { state: UserState.DELETED });
  }

  async restore(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.userRepository.update(entity, { state: UserState.CREATED });
  }

  async delete(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    const result = await this.userRepository.delete(entity);
    this.accountService.emitUserDeleted(result);

    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const entity = await this.userRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return entity;
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return this.userRepository.findByEmailWithPassword(email);
  }
}
