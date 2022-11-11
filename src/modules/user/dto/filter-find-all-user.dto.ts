import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserState } from '../user.types';

export class FilterFindAllUserDto {
  @IsEnum(UserRole)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  role: UserRole;

  @IsEnum(UserState)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  state: UserState;
}
