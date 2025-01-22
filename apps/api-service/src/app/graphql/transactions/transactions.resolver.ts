import { TransactionsService } from './transactions.service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Transaction } from '@animando/transaction';
import { logger } from '@animando/logger';
import { PagedResponse } from '@animando/utils';

@Resolver('TransactionsResolver')
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query('transactions')
  async getAllTransactions(
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('transactions query resolver', { limit, nextToken });
    const requestMeta =
      limit !== undefined || nextToken !== undefined
        ? {
            limit,
            nextToken,
          }
        : undefined;
    const rs = await this.transactionsService.getTransactions(requestMeta);
    return rs;
  }
}
