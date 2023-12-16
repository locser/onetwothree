/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Discount } from '../entities/discount.model';

export interface DiscountRepositoryInterface extends BaseRepositoryInterface<Discount> {}
