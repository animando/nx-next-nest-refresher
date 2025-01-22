import { logger } from '@animando/logger';
import { Cron } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import { TxPublishingService } from './tx-publishing.service';
import { faker } from '@faker-js/faker';
import { TransactionToSave } from '@animando/transaction';
import { addDays } from 'date-fns';

export class TxGeneratorService {
  txPublishingService: TxPublishingService;

  constructor(
    @Inject(TxPublishingService) txPublishingService: TxPublishingService
  ) {
    this.txPublishingService = txPublishingService;
  }

  private generateDummyTransaction(): TransactionToSave {
    const d = new Date();
    return {
      trxId: faker.string.alphanumeric(5),
      transactionDate: faker.date.between({
        from: addDays(d, -4),
        to: addDays(d, 4),
      }),
      code: faker.string.alpha({ length: 3, casing: 'upper' }),
      transactionType: faker.finance.transactionType(),
      transactionDescription: faker.finance.transactionDescription(),
      currency: faker.finance.currency(),
      amount: Number(faker.finance.amount()) * 100,
      routingNumber: faker.finance.routingNumber(),
    };
  }

  @Cron('*/10 * * * * *')
  async handleCron() {
    logger.info('generate transactions');
    await this.txPublishingService.publishTransaction(
      this.generateDummyTransaction()
    );
  }
}
