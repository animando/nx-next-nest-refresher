import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { logger } from '@org/logger';
import { InventoryItem } from '@prisma/client';

@Processor('queued-tasks')
export class TaskConsumer extends WorkerHost {
  async process(job: Job<InventoryItem, void>): Promise<void> {
    logger.info('processing job', { job });
    let progress = 0;
    for (let i = 0; i < 200; i++) {
      await new Promise((res) => setTimeout(res, 20));
      progress += 1;
      await job.updateProgress(progress);
    }
    logger.info('completed job', { jobId: job.id, a: 'b' });
  }
}
