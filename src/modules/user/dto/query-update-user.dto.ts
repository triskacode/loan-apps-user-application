import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { UpdateUserCMD } from '../user.types';

export class QueryUpdateUserDto {
  @IsEnum(UpdateUserCMD)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  cmd?: UpdateUserCMD;
}
