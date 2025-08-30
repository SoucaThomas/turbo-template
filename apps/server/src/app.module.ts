import { Module } from '@nestjs/common';
import { AuthModule } from '@mguay/nestjs-better-auth';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database/database-connection';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { createAuth } from './auth/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule.forRootAsync({
      useFactory: (database: PrismaClient) => ({
        auth: createAuth(database),
      }),
      inject: [DATABASE_CONNECTION],
    }),
    UsersModule,
    EmailModule,
  ],
})
export class AppModule {}
