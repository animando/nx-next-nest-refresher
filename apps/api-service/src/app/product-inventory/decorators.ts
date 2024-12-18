import { Inject } from '@nestjs/common';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';
import { Query, Resolver } from '@nestjs/graphql';

export const InjectProductInventoryClient = () =>
  Inject(PRODUCT_INVENTORY_CLIENT);

export const InventoryQuery = () => Query('inventory');

export const InventoryResolver = () => Resolver('ProductInventoryResolver');
