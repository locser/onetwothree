import { Cart } from '@module/cart/entities/cart.model';
import { CartRepositoryInterface } from '@module/cart/interfaces/cart.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class CartRepository extends BaseRepositoryAbstract<Cart> implements CartRepositoryInterface {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {
    super(cartModel);
  }
}
