import { Inventory } from '@module/inventory/entities/inventory.model';
import { InventoryRepositoryInterface } from '@module/inventory/interfaces/inventory.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class InventoryRepository extends BaseRepositoryAbstract<Inventory> implements InventoryRepositoryInterface {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
  ) {
    super(inventoryModel);
  }
}
