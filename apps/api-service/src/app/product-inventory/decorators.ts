import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RABBIT_CLIENT } from '@org/rabbit';

export const InjectRabbitClient = () => Inject(RABBIT_CLIENT);

export const InventoryQuery = () => Query('inventory');

export const InventoryResolver = () => Resolver('ProductInventoryResolver');
