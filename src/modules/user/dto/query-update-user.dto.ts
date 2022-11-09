import { IsEnum, IsOptional } from 'class-validator';
import { UpdateUserCMD } from '../user.types';

export class QueryUpdateUserDto {
  @IsEnum(UpdateUserCMD)
  @IsOptional()
  cmd?: UpdateUserCMD;
}
