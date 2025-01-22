import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction as DbTransaction, Prisma } from '@prisma/client';
import { Transaction, TransactionToSave } from '@animando/transaction';
import {
  createCursorNextToken,
  createSkipNextToken,
  getCursorFromMeta,
  getSkipFromMeta,
  PagedRequestMeta,
  PagedResponse,
} from '@animando/utils';
import { logger } from '@animando/logger';

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
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('2');
    const cursor = getCursorFromMeta(meta);
    const take = meta?.limit ?? undefined;
    logger.info('3', { take, cursor, limit: meta?.limit });
    const transactions = (
      await this.prisma.transaction.findMany({
        skip: cursor ? 1 : undefined,
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
