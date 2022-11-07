import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserMicroserviceController {
  constructor(private userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'find-by-email-with-password' })
  async findByEmailWithPassword(dto: FindUserByEmailDto): Promise<User> {
    return this.userService.findByEmailWithPassword(dto.email);
  }

  @MessagePattern({ role: 'user', cmd: 'find-by-id' })
  async findById(dto: FindUserByIdDto): Promise<User> {
    return this.userService.findById(dto.id);
  }
}
