import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ExceptionResponse } from 'package-one-two-three';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Discount } from './entities/discount.model';
import { DiscountRepositoryInterface } from './interfaces/discount.interface';
import { CreateDiscount } from './dto/create-discount.dto';
import { QUERY_FLAG } from 'src/constants';
import { ListProductDto } from '@module/product/dto/list-product.dto';

@Injectable()
export class DiscountService extends BaseServiceAbstract<Discount> {
  constructor(
    //MODEL
    @Inject('DiscountRepositoryInterface')
    private readonly discountRepository: DiscountRepositoryInterface,
  ) {
    super(discountRepository);
  }

  async createNewDiscount(user_id: Types.ObjectId, createDiscount: CreateDiscount) {
    const {
      code,
      start_date,
      end_date,
      is_active,
      shopId,
      min_order_value,
      product_ids,
      applies_to,
      name,
      description,
      type,
      users_used,
      value,
      max_value,
      max_users,
      uses_count,
      max_uses_per_user,
    } = createDiscount;

    // Validate
    if (new Date() > new Date(start_date) || new Date() > new Date(end_date)) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount code has expired');
    }

    if (new Date(end_date) < new Date(start_date)) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'End date is before start date');
    }

    // Create index for discount code
    const foundDiscount = await this.discountRepository.findOneByConditionLean({ discount_code: code, discount_shop_id: user_id });
    // findOne({
    //   discount_code: code,
    //   discount_shop_id: user_id,
    // }).lean();

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount is active');
    }

    const newDiscount = this.discountRepository.createNew({
      discount_name: name,
      discount_description: description,
      discount_type: type,
      discount_code: code,
      discount_value: value,
      discount_min_order_value: min_order_value || 0,
      discount_max_value: max_value,
      discount_start_date: new Date(start_date),
      discount_end_date: new Date(end_date),
      discount_max_uses: max_users,
      discount_uses_count: uses_count,
      discount_users_used: users_used,
      discount_user_id: shopId,
      discount_max_uses_per_user: max_uses_per_user,
      discount_is_active: is_active,
      discount_applies_to: applies_to,
      discount_product_ids: applies_to == -1 ? [] : product_ids,
    });

    return newDiscount;
  }

  async getProductAllWithDiscountCode(
    user_id: Types.ObjectId,
    query: any,

    // code: string;
    // shopId: string;
    // userId: string;
    // limit: number;
    // page: number;
  ) {
    const { code, product_user, limit, page } = query;
    // Create index for discount_code
    const foundDiscount = await this.discountRepository.findOneByConditionLean({
      discount_code: code,
      discount_shop_id: product_user,
    });

    if (!foundDiscount || !foundDiscount.discount_is_active) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount not exists');
    }

    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let filter;

    if (discount_applies_to == -1) {
      // Get all products
      filter = {
        product_shop: product_user,
        isPublished: true,
      };
    } else {
      // Get products by product ids
      filter = {
        _id: { $in: discount_product_ids },
        isPublished: true,
      };
    }

    const projection = {};

    const options = {
      limit: +limit,
      page: +page,
      sort: 'created_at',
      select: ['product_name'],
    };

    return await this.discountRepository.findAllLean({
      filter,
      projection,
      options,
    });
  }

  async getAllDiscountCodesByShop(dto: ListProductDto) {
    const { limit = 20, page = 1, product_user } = dto;
    const filter = {
      discount_shopId: product_user,
      discount_is_active: QUERY_FLAG.TRUE,
    };

    const projection = { __v: 0, discount_user_id: 0 };

    const options = {
      limit: limit,
      skip: (page - 1) * limit,
    };

    const allDiscount = await this.discountRepository.findAllLean(filter, projection, options);

    return allDiscount;
  }

  async getDisCountAmount(user_id: Types.ObjectId, body: any) {
    const { code, product_user, products } = body;
    const filter = { discount_code: code, discount_user_id: product_user };
    const foundDiscount = await this.discountRepository.findOneByConditionLean(filter);

    if (!foundDiscount) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount not exists');
    }

    const {
      discount_is_active,
      discount_max_uses,
      discount_uses_count,
      discount_start_date,
      discount_end_date,
      discount_min_order_value,
      discount_users_used, // user đó đã dùng chưa
      discount_max_uses_per_user, // xem mỗi user dùng được mấy lần
      discount_type,
      discount_value,
    } = foundDiscount;

    if (!discount_is_active) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount expired');
    }

    if (discount_max_uses === discount_uses_count) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount are out');

    if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date))
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount code has expired');

    // check số lần sử dụng
    if (discount_max_uses_per_user == 1 && discount_users_used.includes(user_id.toString())) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount code has been used');
    }

    // check xem có yêu cầu gia tri toi thieu hay không
    let totalOrder = 0;

    if (discount_min_order_value > 0) {
      // get total
      totalOrder = products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < discount_min_order_value) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, `Discount requires a minium order value of ${discount_min_order_value}`);
      }
    }

    const amount: number = discount_type === 'fixed_amount' ? +discount_value : totalOrder * (+discount_value / 100);

    return {
      totalOrder: totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
    };
  }

  async cancelDiscountCode(user_id: Types.ObjectId, query: any) {
    const { discount_id } = query;

    const foundDiscount = await this.discountRepository.findOneById(discount_id);
    if (foundDiscount?.discount_user_id != user_id) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Discount not exists');

    const update = {
      $pull: {
        discount_users_used: user_id,
      },
      $inc: {
        discount_max_users: -1,
        discount_uses_count: -1,
      },
    };
    const options = {};

    return await this.discountRepository.findOneAndUpdate(discount_id, update, options);
  }
}
//update discount, tôi không cho phép, tôi muốn hủy discount và tạo discount mới
