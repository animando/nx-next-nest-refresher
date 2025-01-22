import { TransactionsService } from './transactions.service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Transaction } from '@animando/transaction';
import { logger } from '@animando/logger';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';

const getPagedRequestMeta = ({
  limit,
  nextToken,
}: {
  limit: number | undefined;
  nextToken: string | undefined;
}): PagedRequestMeta | undefined => {
  return limit !== undefined || nextToken !== undefined
    ? {
        limit,
        nextToken,
      }
    : undefined;
};
@Resolver('TransactionsResolver')
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query('transactions')
  async getAllTransactions(
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('transactions query resolver', { limit, nextToken });
    const rs = await this.transactionsService.getTransactions(
      getPagedRequestMeta({ limit, nextToken })
    );
    return rs;
  }

  @Query('latestTransactions')
  async getlatestTransactions(
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('latest transactions query resolver', { limit, nextToken });
    const rs = await this.transactionsService.getLatestTransactions(
      getPagedRequestMeta({ limit, nextToken })
    );
    return rs;
  }
}
