import { Query, Resolver } from '@nestjs/graphql';

export const InventoryQuery = () => Query('inventory');

export const InventoryResolver = () => Resolver('ProductInventoryResolver');
