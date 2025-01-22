import { logger } from '@animando/logger';
import { Cron } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import { TxPublishingService } from './tx-publishing.service';
import { faker } from '@faker-js/faker';
import { Transaction } from '@animando/transaction';

export class TxGeneratorService {
  txPublishingService: TxPublishingService;

  constructor(
    @Inject(TxPublishingService) txPublishingService: TxPublishingService
  ) {
    this.txPublishingService = txPublishingService;
  }

  private generateDummyTransaction(): Transaction {
    return {
      id: faker.string.alphanumeric(5),
      code: faker.string.alpha({ length: 3, casing: 'upper' }),
      transactionType: faker.finance.transactionType(),
      transactionDescription: faker.finance.transactionDescription(),
      currency: faker.finance.currency(),
      amount: faker.finance.amount(),
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
