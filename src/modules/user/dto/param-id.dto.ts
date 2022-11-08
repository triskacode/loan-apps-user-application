import { IsNumberString } from 'class-validator';

export class ParamIdDto {
  @IsNumberString()
  id: number;
}
