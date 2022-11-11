import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoanService } from './loan.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'LOAN_APPLICATION',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservice.loan.host'),
            port: configService.get('microservice.loan.port'),
          },
        }),
      },
    ]),
  ],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
