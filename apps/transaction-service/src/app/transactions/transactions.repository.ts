import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction as DbTransaction, Prisma } from '@prisma/client';
import { Transaction, TransactionToSave } from '@animando/transaction';
import {
  createNextToken,
  getSkipFromMeta,
  PagedRequestMeta,
  PagedResponse,
} from '@animando/utils';

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
              nextToken: createNextToken(skip + transactions.length),
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
