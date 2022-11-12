import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { EmitUserActivatedDto } from './dto/emit-user-activated.dto';
import { EmitUserDeletedDto } from './dto/emit-user-deleted.dto';
import { EmitUserUpdatedDto } from './dto/emit-user-updated.dto';

@Injectable()
export class LoanService {
  constructor(
    @Inject('LOAN_APPLICATION') private client: ClientProxy,
    configService: ConfigService,
  ) {
    if (!configService.get('microservice.loan.host'))
      throw new Error('Missing env var LOAN_SERVICE_HOST');
    if (!configService.get('microservice.loan.port'))
      throw new Error('Missing env var LOAN_SERVICE_PORT');
  }

  emitUserActivated(dto: EmitUserActivatedDto) {
    this.client.emit('user-activated', dto);
  }

  emitUserUpdated(dto: EmitUserUpdatedDto) {
    this.client.emit('user-updated', dto);
  }

  emitUserDeleted(dto: EmitUserDeletedDto) {
    this.client.emit('user-deleted', dto);
  }
}
