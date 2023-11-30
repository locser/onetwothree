import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ExceptionResponse } from 'package-one-two-three';
import { PRODUCT_TYPE } from 'src/constants/product.constant';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { CreateNewBigProductDto } from './dto/create-new-big-product-dto';
import { CreateClothingProductDto, CreateDecorProductDto, CreateElectronicProductDto } from './dto/create-product-attribute.dto';
import { Clothing } from './entities/clothing-product.entity';
import { Decor } from './entities/decor-product.entity';
import { Electronic } from './entities/electronic-product.entity';
import { Product } from './entities/product.entity';
import { ProductsRepositoryInterface } from './interfaces/product.interface';
import { CatchException } from 'src/interceptors/exception-response';

@Injectable()
export class ProductService extends BaseServiceAbstract<Product> {
  constructor(
    @Inject('ProductsRepositoryInterface')
    private readonly productRepository: ProductsRepositoryInterface,
    @InjectModel(Clothing.name)
    private readonly clothingProductModel: Model<Clothing>,
    @InjectModel(Decor.name)
    private readonly decorProductModel: Model<Decor>,
    @InjectModel(Electronic.name)
    private readonly electronicProductModel: Model<Electronic>,
  ) {
    super(productRepository);
  }

  async createNewBigProduct(user_id: Types.ObjectId, createNewBigProductDto: CreateNewBigProductDto) {
    try {
      const product_attributes = await this.createProductAttribute(
        createNewBigProductDto.product_type,
        createNewBigProductDto.product_attributes,
      );

      if (!product_attributes) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ createNewBigProduct ~ Tạo product_attributes thất bại:');
      }

      const newBigProduct = await this.productRepository.createNewBigProduct({
        product_name: createNewBigProductDto.product_name,
        product_thumb: createNewBigProductDto.product_thumb,
        product_description: createNewBigProductDto.product_description,
        product_price: createNewBigProductDto.product_price,
        product_quantity: createNewBigProductDto.product_quantity,
        product_type: createNewBigProductDto.product_type,
        product_user: user_id,
        product_attributes: product_attributes,
      });
      if (!newBigProduct) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#02#ProductService ~ createNewBigProduct ~ Tạo big-product thất bại:');
      }
      return newBigProduct;
    } catch (error) {
      console.log('ProductService ~ createNewBigProduct ~ error:', error);
      throw new CatchException(error);
    }
  }

  async createProductAttribute(
    type_product: PRODUCT_TYPE,
    createProductAttribute: CreateClothingProductDto | CreateDecorProductDto | CreateElectronicProductDto,
  ): Promise<Clothing | Decor | Electronic> {
    if (type_product) {
      let product_attributes: any;
      switch (type_product) {
        case PRODUCT_TYPE.CLOTHING:
          product_attributes = await this.createClothingProduct({
            brand: (createProductAttribute as CreateClothingProductDto)?.brand,
            size: (createProductAttribute as CreateClothingProductDto)?.size,
            material: (createProductAttribute as CreateClothingProductDto)?.material,
          });
          break;

        default:
          throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01- ProductRepository - createBigProduct: Tạo sản phẩm không thành công!');
      }
      return product_attributes;
    }
  }

  async createClothingProduct(createClothingProductDto: Partial<Clothing>): Promise<Clothing> {
    const newClothingProduct = await this.clothingProductModel.create(createClothingProductDto);
    return newClothingProduct;
  }

  async createDecorProduct(createDecorProductDto: Partial<Decor>): Promise<Decor> {
    const newDecorProduct = await this.decorProductModel.create(createDecorProductDto);
    return newDecorProduct;
  }

  async createElectronicProduct(createElectronicProductDto: Partial<Electronic>): Promise<Electronic> {
    const newElectronicProduct = await this.electronicProductModel.create(createElectronicProductDto);
    return newElectronicProduct;
  }
}
