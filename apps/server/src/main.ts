import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { toNodeHandler } from 'better-auth/node';
import { AuthService } from '@mguay/nestjs-better-auth';
import { ConfigService } from '@nestjs/config';
import express = require('express');
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  // Create Express instance first
  const expressApp = express();

  // Create NestJS app with explicit Express adapter
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { bodyParser: false }
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Access BetterAuth instance from AuthService
  const authService = app.get<AuthService>(AuthService);

  // Mount BetterAuth before body parsers
  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler)
  );

  // Re-enable Nest's JSON body parser AFTER mounting BetterAuth
  expressApp.use(express.json());

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
void bootstrap();
