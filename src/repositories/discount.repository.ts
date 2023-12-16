import { Discount } from '@module/discount/entities/discount.model';
import { DiscountRepositoryInterface } from '@module/discount/interfaces/discount.interface';
import { Inventory } from '@module/inventory/entities/inventory.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class DiscountRepository extends BaseRepositoryAbstract<Discount> implements DiscountRepositoryInterface {
  constructor(
    @InjectModel(Discount.name)
    private readonly discountModel: Model<Discount>,
  ) {
    super(discountModel);
  }
}
