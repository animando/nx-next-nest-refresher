import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction as DbTransaction, Prisma } from '@prisma/client';
import {
  Transaction,
  TransactionSearch,
  TransactionToSave,
} from '@animando/transaction';
import {
  createCursorNextToken,
  createSkipNextToken,
  getCursorFromMeta,
  getSkipFromMeta,
  PagedRequestMeta,
  PagedResponse,
} from '@animando/utils';

type SearchClause =
  | {
      contains: string;
    }
  | { equals: string };

type Operator = 'contains' | 'equals';

const getOperator = (key: keyof TransactionSearch): Operator => {
  switch (key) {
    case 'transactionType':
      return 'equals';
    case 'transactionDescription':
      return 'contains';
    default:
      throw Error('unknown key');
  }
};

const createWhereClause = (search: TransactionSearch) => {
  return Object.entries(search).reduce<
    Record<keyof TransactionSearch, SearchClause>
  >((acc, [key, value]) => {
    const searchKey = key as keyof TransactionSearch;
    const operator = getOperator(searchKey);
    return {
      ...acc,
      [searchKey]: { [operator]: value },
    };
  }, {} as Record<keyof TransactionSearch, SearchClause>);
};

@Injectable()
export class TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async getAllTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    const skip = getSkipFromMeta(meta);
    const take = meta?.limit ?? undefined;
    const transactions = (
      await this.prisma.transaction.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'asc',
        },
      })
    ).map(fromPrismaTransaction);

    return {
      data: transactions,

      meta: {
        count: transactions.length,
        ...(meta?.limit && transactions.length === meta.limit
          ? {
              nextToken: createSkipNextToken(skip + transactions.length),
            }
          : {}),
      },
    };
  }

  async getLatestTransactions(
    meta?: PagedRequestMeta,
    search?: TransactionSearch
  ): Promise<PagedResponse<Transaction[]>> {
    const cursor = getCursorFromMeta(meta);
    const take = meta?.limit ?? undefined;
    const whereClause = search ? createWhereClause(search) : undefined;
    const transactions = (
      await this.prisma.transaction.findMany({
        skip: cursor ? 1 : undefined,
        where: whereClause,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        take: take ? -take : undefined,
        orderBy: {
          createdAt: 'asc',
        },
      })
    ).map(fromPrismaTransaction);

    return {
      data: transactions,

      meta: {
        count: transactions.length,
        ...(meta?.limit && transactions.length === meta.limit
          ? {
              nextToken: createCursorNextToken(transactions[0].id),
            }
          : {}),
      },
    };
  }

  async saveTransaction(transaction: TransactionToSave) {
    return this.prisma.transaction.create({
      data: toPrismaTransactionForCreate(transaction),
    });
  }
}

const toPrismaTransactionForCreate = (
  transaction: TransactionToSave
): Prisma.TransactionCreateInput => {
  const { currency, ...rest } = transaction;
  return {
    ...rest,
    currencyCode: currency.code,
  };
};

const fromPrismaTransaction = (value: DbTransaction): Transaction => {
  const { ...rest } = value;

  return {
    ...rest,
    currency: {
      code: value.currencyCode,
      name: '',
      symbol: '$',
    },
  };
};
