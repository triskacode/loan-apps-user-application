import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { EmitUserActivatedDto } from './dto/emit-user-activated.dto';
import { EmitUserDeletedDto } from './dto/emit-user-deleted.dto';
import { EmitUserUpdatedDto } from './dto/emit-user-updated.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_APPLICATION') private client: ClientProxy,
    configService: ConfigService,
  ) {
    if (!configService.get('microservice.account.host'))
      throw new Error('Missing env var ACCOUNT_SERVICE_HOST');
    if (!configService.get('microservice.account.port'))
      throw new Error('Missing env var ACCOUNT_SERVICE_PORT');
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
