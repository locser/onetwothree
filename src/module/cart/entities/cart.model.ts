import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CART_COLLECTION_NAME } from 'src/constants';

export type DiscountDocument = mongoose.HydratedDocument<Cart>;

@Schema({
  collection: CART_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Cart extends BaseEntity {
  @Prop({ type: String, required: true, enum: ['active, pending', 'block'], default: 'active' })
  cart_state: string;

  @Prop({ type: Array, required: true, default: [] })
  cart_products: string;
  /**
   * {
   *     productId,
   *     shopId,
   *     quantity,
   *     name,
   *     price
   * }
   */
  @Prop({ type: Number, default: 0 })
  cart_count_product: number;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  cart_user_id: Types.ObjectId | string;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
