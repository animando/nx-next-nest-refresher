import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { logger } from '@org/logger';
import { InventoryItem } from '@org/inventory';

@Processor('queued-tasks')
export class TaskConsumer extends WorkerHost {
  async process(job: Job<InventoryItem, void>): Promise<void> {
    logger.info('processing job', { job });
    let progress = 0;
    const increments = 20;
    for (let i = 0; i < 20; i++) {
      await new Promise((res) => setTimeout(res, 1000));
      progress += 100 / increments;
      logger.info('progress update', { progress });
      await job.updateProgress(progress);
    }
    logger.info('completed job', { jobId: job.id, a: 'b' });
  }
}
