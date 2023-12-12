import { Product } from '@module/product/entities/product.entity';
import { ProductsRepositoryInterface } from '@module/product/interfaces/product.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class ProductRepository extends BaseRepositoryAbstract<Product> implements ProductsRepositoryInterface {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }

  async createNewBigProduct(createBigProductDto: Partial<Product>) {
    const newBigProduct = await this.productModel.create({
      _id: createBigProductDto.product_attributes.id,
      product_name: createBigProductDto.product_name,
      product_thumb: createBigProductDto.product_thumb,
      product_description: createBigProductDto.product_description,
      product_price: createBigProductDto.product_price,
      product_quantity: createBigProductDto.product_quantity,
      product_type: createBigProductDto.product_type,
      product_user: createBigProductDto.product_user,
      product_attributes: createBigProductDto.product_attributes,
    });
    return newBigProduct;
  }
}
