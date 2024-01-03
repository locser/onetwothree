import { ProductService } from '@module/product/product.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Cart } from './entities/cart.model';
import { CartRepositoryInterface } from './interfaces/cart.interface';
import { ExceptionResponse } from 'package-one-two-three';

@Injectable()
export class CartService extends BaseServiceAbstract<Cart> {
  constructor(
    //MODEL
    @Inject('CartRepositoryInterface')
    private readonly cartRepository: CartRepositoryInterface,

    private readonly productService: ProductService,
  ) {
    super(cartRepository);
  }

  async createCartService(user_id: Types.ObjectId) {
    return await this.cartRepository.createNew({
      cart_user_id: user_id,
      cart_count_product: 0,
      cart_state: 'active',
    });
  }

  async addProductToCart(user_id: Types.ObjectId, product: any) {
    // const hasProduct = await this.productService.hasExist({ _id: product?._id, is_draft: 0 });
    // if (!hasProduct) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#CartService ~ addProductToCart: Sản phẩm không tồn tại');

    const query = {
      cart_user_id: user_id,
      cart_state: 'active',
    };

    const update = {
        $addToSet: {
          cart_products: product,
        },
      },
      options = { upsert: true, new: true };

    return await this.cartRepository.findOneAndUpdate(query, update, options);
  }

  async updateUserCartQuantity(user_id: Types.ObjectId, product: any) {
    const query = {
        cart_user_id: user_id,
        'cart_products.productId': product?._id,
        cart_state: 'active',
      },
      updateSet = {
        $inc: {
          'cart_products.$.quantity': product?.quantity,
        },
      },
      options = { upsert: true, new: true };

    return await this.cartRepository.findOneAndUpdate(query, updateSet, options);
  }

  // update cart
  /**
   * product_order:
   *  {
   *      shopId,
   *      item_products:
   *          {
   *              quantity,
   *              price,
   *              shopId,
   *              old_quantity,
   *              productId
   *          }
   *      ,
   *      version
   *  }
   *
   */
  async addToCartV2(user_id: Types.ObjectId, product_order: any) {
    const { product_id, quantity, old_quantity } = product_order?.item_products[0];

    // hasexist het tat ca
    // check product
    const foundProduct = await this.productService.getDetailProduct(user_id, product_id);
    if (!foundProduct) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Product not found');

    // compare
    if (foundProduct.product_user.toString() !== product_order[0]?.shop_id) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Product do not belong to the shop');
    }

    if (quantity === 0) {
      // todo deleted
    }

    // return await CartService.updateUserCartQuantity({
    //   userId,
    //   product: {
    //     productId,
    //     quantity: quantity - old_quantity,
    //   },
    // });
  }
}
