import { Module } from '@nestjs/common';

import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QueueModule } from '@animando/queue';
import { INVENTORY_TASKS_QUEUE } from '@animando/inventory';

@Module({
  imports: [
    QueueModule.register(INVENTORY_TASKS_QUEUE),
    BullBoardModule.forRoot({
      route: '/',
      adapter: ExpressAdapter,
    }),

    BullBoardModule.forFeature({
      name: INVENTORY_TASKS_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
})
export class AppModule {}
