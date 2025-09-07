import { AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { PrismaClient } from '@prisma/client';
import { createAuth } from './auth/auth';
import configuration, { type AppConfig } from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { DATABASE_CONNECTION } from './database/database-connection';
import { EmailModule } from './email/email.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

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
    UploadModule,
  ],
})
export class AppModule {}
