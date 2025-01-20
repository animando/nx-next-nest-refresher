import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { logger } from '@animando/logger';
import { tap } from 'rxjs';

export class TimingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    return next.handle().pipe(
      tap(() =>
        logger.info('intercepting - after', {
          timeTaken: `${Date.now() - start}ms`,
        })
      )
    );
  }
}
