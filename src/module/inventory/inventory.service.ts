import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Inventory } from './entities/inventory.model';
import { InventoryRepositoryInterface } from './interfaces/inventory.interface';

@Injectable()
export class InventoryService extends BaseServiceAbstract<Inventory> {
  constructor(
    //MODEL
    @Inject('InventoryRepositoryInterface')
    private readonly inventoryRepository: InventoryRepositoryInterface,
  ) {
    super(inventoryRepository);
  }
}
