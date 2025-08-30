import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;

    // Log the incoming request
    this.logger.log(`${method} ${url}`);

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const statusCode = response.statusCode;

        // Log the response with status code and response time
        this.logger.log(`${method} ${url} - ${statusCode} - ${responseTime}ms`);
      })
    );
  }
}
