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
import { FilterFindAllUserDto } from './dto/filter-find-all-user.dto';
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
  update(
    @Param() param: ParamIdDto,
    @Body() dto: UpdateUserDto,
    @Query('action')
    action?: 'activate' | 'suspend' | 'soft-delete' | 'restore',
  ) {
    switch (action) {
      case 'activate':
        return this.userService.activate(param.id);
      case 'suspend':
        return this.userService.suspend(param.id);
      case 'soft-delete':
        return this.userService.softDelete(param.id);
      case 'restore':
        return this.userService.restore(param.id);
      default:
        return this.userService.update(param.id, dto);
    }
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
  findAll(@Query() filter: FilterFindAllUserDto) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  findById(@Param() param: ParamIdDto) {
    return this.userService.findById(param.id);
  }
}
