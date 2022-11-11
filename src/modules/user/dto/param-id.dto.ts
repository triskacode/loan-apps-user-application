import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParamIdDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
