import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { RabbitModule } from '@animando/rabbit';

@Module({
  imports: [RabbitModule],
  providers: [TransactionsService, TransactionsResolver],
})
export class TransactionsModule {}
