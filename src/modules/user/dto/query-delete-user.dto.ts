import { IsBoolean, IsOptional } from 'class-validator';

export class QueryDeleteUserDto {
  @IsBoolean()
  @IsOptional()
  force?: boolean;
}
