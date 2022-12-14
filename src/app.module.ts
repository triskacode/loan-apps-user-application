import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { AppController } from './app.controller';
import { DatabaseConfig } from './config/database.config';
import { MicroserviceConfig } from './config/microservice.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DataSource } from 'typeorm';
import { runSeeder } from 'typeorm-extension';
import { UserSeeder } from './database/seeders/user.seeder';
import { AccountModule } from './modules/account/account.module';
import { LoanModule } from './modules/loan/loan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, MicroserviceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('database.name'),
        logger: 'advanced-console',
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('app.env') === 'development' ? true : false,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);

        await dataSource.initialize();
        await runSeeder(dataSource, UserSeeder);

        return dataSource;
      },
    }),
    UserModule,
    AuthModule,
    AccountModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
