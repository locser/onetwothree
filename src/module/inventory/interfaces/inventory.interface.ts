/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Inventory } from '../entities/inventory.model';

export interface InventoryRepositoryInterface extends BaseRepositoryInterface<Inventory> {}
