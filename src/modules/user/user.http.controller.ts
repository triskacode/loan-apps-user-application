import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { QueryUpdateUserDto } from './dto/query-update-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UpdateUserCMD, UserRole } from './user.types';

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
  update(
    @Param() param: ParamIdDto,
    @Body() dto: UpdateUserDto,
    @Query() query: QueryUpdateUserDto,
  ) {
    if (query.cmd) {
      switch (query.cmd) {
        case UpdateUserCMD.UPDATE:
          return this.userService.update(param.id, dto);
        case UpdateUserCMD.ACTIVATE:
          return this.userService.activate(param.id);
        case UpdateUserCMD.SUSPEND:
          return this.userService.suspend(param.id);
        case UpdateUserCMD.SOFT_DELETE:
          return this.userService.softDelete(param.id);
        case UpdateUserCMD.RESTORE:
          return this.userService.restore(param.id);
      }
    }

    return this.userService.update(param.id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  delete(@Param() param: ParamIdDto) {
    return this.userService.delete(param.id);
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
