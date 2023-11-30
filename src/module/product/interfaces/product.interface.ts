/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Product } from '../entities/product.entity';

export interface ProductsRepositoryInterface extends BaseRepositoryInterface<Product> {
  // createClothingProduct(createClothingProductDto: Partial<Clothing>): Promise<Clothing>;
  // createDecorProduct(createDecorProductDto: Partial<Decor>): Promise<Decor>;
  // createElectronicProduct(createElectronicProductDto: Partial<Electronic>): Promise<Electronic>;
  createNewBigProduct(createBigProductDto: Partial<Product>): Promise<Product>;
}
