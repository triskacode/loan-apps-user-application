import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.types';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  email: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  role: UserRole;
}
