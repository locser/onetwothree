/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Cart } from '../entities/cart.model';

export interface CartRepositoryInterface extends BaseRepositoryInterface<Cart> {}
