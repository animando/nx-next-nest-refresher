import { Processor, WorkerHost } from '@nestjs/bullmq';
import { delay, Job } from 'bullmq';
import { logger } from '@animando/logger';
import { INVENTORY_TASKS_QUEUE, InventoryItem } from '@animando/inventory';
import { QUEUE_WORKER_CONCURRENCY } from '@animando/queue';
import { z } from 'zod';

const progressSchema = z.number().or(
  z.object({
    completeness: z.number(),
    i: z.number(),
  })
);
type Progress = z.infer<typeof progressSchema>;

const getProgress = (progress: Progress) => {
  return typeof progress === 'number' ? progress : progress.completeness;
};
const getLoopStart = (progress: Progress) => {
  return typeof progress === 'number' ? progress : progress.i;
};
const randomError = (chanceOfErrorDecimal: number) => {
  if (Math.random() > chanceOfErrorDecimal) {
    logger.info('random error');
    throw new Error('forced failure');
  }
};

const incrementDelay = 500;
const iterations = 20;

@Processor(INVENTORY_TASKS_QUEUE, { concurrency: QUEUE_WORKER_CONCURRENCY })
export class TaskConsumer extends WorkerHost {
  async process(job: Job<InventoryItem, void>): Promise<void> {
    const jobProgress = progressSchema.parse(job.progress);
    let progress = getProgress(jobProgress);
    logger.info('processing job', {
      job,
    });

    for (
      let i = getLoopStart(jobProgress);
      i < iterations;
      i++, progress += 100 / iterations
    ) {
      await delay(incrementDelay);
      randomError(0.9);
      logger.info('progress update', { jobId: job.id, progress, i });
      await job.updateProgress({ completeness: progress, i });
    }

    logger.info('completed job', { jobId: job.id });
  }
}
