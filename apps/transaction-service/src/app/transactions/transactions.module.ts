import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from './prisma.service';
import { TransactionsRepository } from './transactions.repository';
import { RabbitModule } from '@animando/rabbit';

@Module({
  imports: [RabbitModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, TransactionsRepository],
})
export class TransactionsModule {}
