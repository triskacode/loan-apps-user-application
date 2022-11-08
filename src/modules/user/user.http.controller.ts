import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { ParamIdDto } from './dto/param-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserRole } from './user.types';

@Controller('user')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserHttpController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param() param: ParamIdDto, @Body() dto: UpdateUserDto) {
    return this.userService.update(param.id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param() param: ParamIdDto) {
    return this.userService.remove(param.id);
  }

  @Get()
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  findById(@Param() param: ParamIdDto) {
    return this.userService.findById(param.id);
  }
}
