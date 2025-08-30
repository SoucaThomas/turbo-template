import { Module } from '@nestjs/common';
import { AuthModule } from '@mguay/nestjs-better-auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database/database-connection';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { createAuth } from './auth/auth';
import configuration, { AppConfig } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule.forRootAsync({
      useFactory: (
        database: PrismaClient,
        configService: ConfigService<AppConfig>
      ) => ({
        auth: createAuth(database, configService),
      }),
      inject: [DATABASE_CONNECTION, ConfigService],
    }),
    UsersModule,
    EmailModule,
  ],
})
export class AppModule {}
