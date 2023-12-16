import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { DISCOUNT_COLLECTION_NAME } from 'src/constants';

export type DiscountDocument = mongoose.HydratedDocument<Discount>;

@Schema({
  collection: DISCOUNT_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Discount extends BaseEntity {
  @Prop({ type: String, required: true })
  discount_name: string;

  @Prop({ type: String, required: true })
  discount_description: string;

  @Prop({ type: String, default: 'fixed_amount', required: true })
  discount_type: string;
  // percentage - nếu là fixed_amount cho nó là percentage hết,
  // còn không thì cho giảm thẳng số tiền

  @Prop({ type: String, required: true })
  discount_value: string;

  @Prop({ type: Number, required: true })
  discount_max_value: number;

  @Prop({ type: String, required: true })
  discount_code: string;

  @Prop({ type: Date, required: true })
  discount_start_date: Date;

  @Prop({ type: Date, required: true })
  discount_end_date: Date;

  @Prop({ type: Number, required: true })
  discount_max_uses: number; // số lần(người) có thể sử dụng,( cho phép sử dụng bao nhiêu lần)

  @Prop({ type: Number, required: true })
  discount_uses_count: number; // số lần đã sử dụng

  @Prop({ type: [String], default: [] })
  discount_users_used: string[]; // những user_id nào đã sử dụng

  @Prop({ type: Number, required: true })
  discount_max_uses_per_user: number; // số lần mà 1 user có thể dùng

  @Prop({ type: Number, required: true })
  discount_min_order_value: number; //giá trị nhỏ nhất đơn hàng để có thể áp dụng

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  discount_user_id: Types.ObjectId | string; // user tạo discount (shop nào tạo)

  @Prop({ type: Boolean, required: true })
  discount_is_active: boolean; //trạng thái

  @Prop({ type: Number, required: true })
  discount_applies_to: number; // enum: ['all', 'specific'] cho sản phẩm loại nào
  // để tạm là number đi, -1 thì cho áp dụng tất cả, còn không thì áp dụng cho từng product_type
  // nếu 0 thì không áp dụng vậy 1 vài sản phẩm trong discount_product_ids

  @Prop({ type: [String], default: [] })
  discount_product_ids: string[]; // các sản phẩm được áp dụng
}
export const DiscountSchema = SchemaFactory.createForClass(Discount);
