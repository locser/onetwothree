import { BaseEntity } from '@module/shared/base/base.entity';
import { User } from '@module/user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { PRODUCT_COLLECTION_NAME, USER_COLLECTION_NAME } from 'src/constants';
import { PRODUCT_TYPE } from 'src/constants/product.constant';

export type ProductDocument = mongoose.HydratedDocument<Product>;

@Schema({
  collection: PRODUCT_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Product extends BaseEntity {
  @Prop({
    type: String,
    required: true,
  })
  product_name: string;

  @Prop({
    type: String,
    required: true,
  })
  product_thumb: string;

  @Prop({
    type: String,
    required: true,
  })
  product_description: string;

  @Prop({
    type: Number,
    required: true,
  })
  product_price: number;

  @Prop({
    type: Number,
    required: true,
  })
  product_quantity: number;

  @Prop({
    type: Number,
    required: true,
    enum: PRODUCT_TYPE,
  })
  product_type: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: USER_COLLECTION_NAME,
  })
  product_user: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  product_attributes: any;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
