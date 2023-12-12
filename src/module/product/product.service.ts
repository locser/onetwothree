import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ExceptionResponse } from 'package-one-two-three';
import { QUERY_FLAG } from 'src/constants';
import { PRODUCT_TYPE } from 'src/constants/product.constant';
import { CatchException } from 'src/interceptors/exception-response';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { CreateNewBigProductDto } from './dto/create-new-big-product-dto';
import { CreateClothingProductDto, CreateDecorProductDto, CreateElectronicProductDto } from './dto/create-product-attribute.dto';
import { ListProductDto } from './dto/list-product.dto';
import { Clothing } from './entities/clothing-product.entity';
import { Decor } from './entities/decor-product.entity';
import { Electronic } from './entities/electronic-product.entity';
import { Product } from './entities/product.entity';
import { ProductsRepositoryInterface } from './interfaces/product.interface';
import { UserService } from '@module/user/user.service';
import { SORT_TYPE } from 'src/types/common.type';
import { InventoryService } from '@module/inventory/inventory.service';

@Injectable()
export class ProductService extends BaseServiceAbstract<Product> {
  getDetailProduct(_id: Types.ObjectId, product_id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('ProductsRepositoryInterface')
    private readonly productRepository: ProductsRepositoryInterface,
    @InjectModel(Clothing.name)
    private readonly clothingProductModel: Model<Clothing>,
    @InjectModel(Decor.name)
    private readonly decorProductModel: Model<Decor>,
    @InjectModel(Electronic.name)
    private readonly electronicProductModel: Model<Electronic>,

    //SERVICE
    private readonly userService: UserService,
    private readonly inventoryService: InventoryService,
  ) {
    super(productRepository);
  }

  async getAllProductPublicHomePage(listProductDto: ListProductDto) {
    const { limit = 20, page = 1 } = listProductDto;

    const condition = { is_public: QUERY_FLAG.TRUE };
    const projection = {};
    const options = {
      // populate: {
      //   path: 'product_user',
      //   select: '_id name email phone',
      // },
      limit: limit,
      skip: (page - 1) * limit,
      sort: { create_at: SORT_TYPE.ASC },
    };

    return await this.productRepository.findAllLean(condition, projection, options);
  }

  // cho sản phẩm public, còn cho sản phẩm un_public khác
  async getDetailPublicProduct(product_id: string) {
    const product = await this.productRepository.findOneById(product_id);

    if (!product) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ getDetailProduct ~ Product không tồn tại');

    //xử lý sau
    // if(product.is_un_public == QUERY_FLAG.TRUE) {

    // }

    if (product.is_draft == QUERY_FLAG.TRUE) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#02#ProductService ~ ');
    }

    return product;
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

      await this.inventoryService.createNew({
        inventory_product_id: newBigProduct._id,
        inventory_stock: newBigProduct.product_quantity,
        inventory_user_id: user_id,
      });

      return newBigProduct;
    } catch (error) {
      console.log('ProductService ~ createNewBigProduct ~ error:', error);
      throw new CatchException(error);
    }
  }

  async getAllProductDraft(listProductDto: ListProductDto) {
    const { product_user, limit = 10, page = 1 } = listProductDto;

    const hasProductUser = await this.userService.hasExist(product_user);

    if (!hasProductUser) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ getAllProductDraft: Không tìm thấy product user này');
    }

    const condition = { product_user: listProductDto.product_user, is_draft: QUERY_FLAG.TRUE };
    const projection = {};
    const options = {
      populate: {
        path: 'product_user',
        select: '_id name email phone',
      },
      limit: limit,
      skip: (page - 1) * limit,
      sort: { create_at: SORT_TYPE.ASC },
    };

    // populate: [
    //   {
    //     path: 'product_user',
    //     select: '_id name email'
    //   },
    //   {
    //     path: 'category',
    //     select: '_id name'
    //   }
    // ]

    return await this.productRepository.findAllLean(condition, projection, options);
  }

  async getAllProductPublic(listProductDto: ListProductDto) {
    const { product_user, limit = 10, page = 1 } = listProductDto;

    const hasProductUser = await this.userService.hasExist(product_user);

    if (!hasProductUser) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ getAllProductDraft: Không tìm thấy product user này');
    }

    const condition = { product_user: listProductDto.product_user, is_public: QUERY_FLAG.TRUE };
    const projection = {};
    const options = {
      populate: {
        path: 'product_user',
        select: '_id name email phone',
      },
      limit: limit,
      skip: (page - 1) * limit,
      sort: { create_at: SORT_TYPE.ASC },
    };

    return await this.productRepository.findAllLean(condition, projection, options);
  }

  async getAllProductUnPublic(listProductDto: ListProductDto) {
    const { product_user, limit = 10, page = 1 } = listProductDto;

    const hasProductUser = await this.userService.hasExist(product_user);

    if (!hasProductUser) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ getAllProductDraft: Không tìm thấy product user này');
    }

    const condition = { product_user: listProductDto.product_user, is_un_public: QUERY_FLAG.TRUE };
    const projection = {};
    const options = {
      populate: {
        path: 'product_user',
        select: '_id name email phone',
      },
      limit: limit,
      skip: (page - 1) * limit,
      sort: { create_at: SORT_TYPE.ASC },
    };

    return await this.productRepository.findAllLean(condition, projection, options);
  }

  async updatePublicBigProduct(user_id: Types.ObjectId, product_id: string) {
    const hasProduct = await this.productRepository.findOneByConditionLean({ _id: product_id, product_user: user_id });

    if (!hasProduct)
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ updatePublicBigProduct: Không tìm thấy sản phẩm');

    return await this.productRepository.update(product_id, {
      is_public: QUERY_FLAG.TRUE,
      is_draft: QUERY_FLAG.FALSE,
      is_un_public: QUERY_FLAG.FALSE,
    });
  }

  async updateDraftBigProduct(user_id: Types.ObjectId, product_id: string) {
    const hasProduct = await this.productRepository.findOneByConditionLean({ _id: product_id, product_user: user_id });

    if (!hasProduct)
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ updateDraftBigProduct: Không tìm thấy sản phẩm');

    return await this.productRepository.update(product_id, {
      is_public: QUERY_FLAG.FALSE,
      is_draft: QUERY_FLAG.TRUE,
      is_un_public: QUERY_FLAG.FALSE,
    });
  }

  async updateUnPublicBigProduct(user_id: Types.ObjectId, product_id: string) {
    const hasProduct = await this.productRepository.findOneByConditionLean({ _id: product_id, product_user: user_id });

    if (!hasProduct)
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#ProductService ~ updateUnPublicBigProduct: Không tìm thấy sản phẩm');

    return await this.productRepository.update(product_id, {
      is_public: QUERY_FLAG.FALSE,
      is_draft: QUERY_FLAG.FALSE,
      is_un_public: QUERY_FLAG.TRUE,
    });
  }

  /**
   * ========================SUB FUNC================================
   */

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
