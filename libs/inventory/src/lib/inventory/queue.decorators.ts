import { InjectQueue } from '@nestjs/bullmq';
import { INVENTORY_TASKS_QUEUE } from './queue.names';

export const InjectInventoryTaskQueue = () =>
  InjectQueue(INVENTORY_TASKS_QUEUE);
