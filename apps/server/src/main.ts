import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { toNodeHandler } from 'better-auth/node';
import { AuthService } from '@mguay/nestjs-better-auth';
import { Express, urlencoded } from 'express';
import { json } from 'express';

async function bootstrap() {
  // Disable NestJS's built-in body parser so we can control ordering
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Access Express instance
  const expressApp = app.getHttpAdapter().getInstance() as Express;

  // Access BetterAuth instance from AuthService
  const authService = app.get<AuthService>(AuthService);

  // Mount BetterAuth before body parsers
  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler),
  );

  // Re-enable Nest's JSON body parser AFTER mounting BetterAuth
  expressApp.use(json());
  expressApp.use(urlencoded({ extended: true }));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
