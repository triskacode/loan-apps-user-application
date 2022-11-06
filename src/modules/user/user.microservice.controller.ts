import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserMicroserviceController {
  @MessagePattern({ role: 'user', cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    console.log(data);
    return (data || []).reduce((a, b) => a + b);
  }
}
