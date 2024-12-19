import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const removeOnCompleteSchema = z.union([
  z.boolean(),
  z.number(),
  z.object({
    age: z.number().optional(),
    count: z.number().optional(),
  }),
]);

const backoffSchema = z.object({
  type: z.enum(['fixed', 'exponential']),
  delay: z.number().optional(),
});

@Injectable()
export class QueueConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get defaultRemoveOnComplete() {
    const value = removeOnCompleteSchema.parse(
      JSON.parse(
        this.configService.getOrThrow('QUEUE_DEFAULT_REMOVE_ON_COMPLETE')
      )
    );
    return value;
  }
  public get defaultAttempts() {
    return Number(this.configService.getOrThrow('QUEUE_DEFAULT_ATTEMPTS'));
  }

  public get defaultBackoff() {
    return backoffSchema.parse(
      JSON.parse(this.configService.getOrThrow('QUEUE_DEFAULT_BACKOFF'))
    );
  }
}
