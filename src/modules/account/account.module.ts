import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountService } from './account.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ACCOUNT_APPLICATION',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservice.account.host'),
            port: configService.get('microservice.account.port'),
          },
        }),
      },
    ]),
  ],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
