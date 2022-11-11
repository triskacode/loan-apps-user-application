import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmitUserActivatedDto } from './dto/emit-user-activated.dto';
import { EmitUserDeletedDto } from './dto/emit-user-deleted.dto';
import { EmitUserUpdatedDto } from './dto/emit-user-updated.dto';

@Injectable()
export class AccountService {
  constructor(@Inject('ACCOUNT_APPLICATION') private client: ClientProxy) {}

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
