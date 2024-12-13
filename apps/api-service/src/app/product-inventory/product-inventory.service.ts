import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductInventoryService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
