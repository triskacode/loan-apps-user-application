import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserHttpController } from './user.http.controller';
import { UserMicroserviceController } from './user.microservice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserHttpController, UserMicroserviceController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
