import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { PRODUCT_COLLECTION_NAME } from 'src/constants';
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
    index: true,
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
    ref: 'User',
  })
  product_user: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  product_attributes: any;

  @Prop({
    type: Number,
    default: 0,
    enum: [0, 1], // 0: không public 1:public
  })
  is_public: number;

  @Prop({
    type: Number,
    default: 1,
    enum: [0, 1], // 0: không là sản phẩm sử dụng thử, 1: sản phẩm sử dụng thử
    select: false, // không lấy ra khi query
  })
  is_draft: number;

  @Prop({
    type: Number,
    default: 0,
    enum: [0, 1], // 0: không là sản phẩm sử dụng thử, 1: sản phẩm sử dụng thử
    select: false, // không lấy ra khi query
  })
  is_un_public: number;

  @Prop({
    type: Number,
    default: 4.5,
  })
  product_rating_average: number;

  @Prop({
    type: String,
    lowercase: true,
  })
  product_slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// Middleware to auto-generate product_slug before saving
ProductSchema.pre('save', function (next) {
  const product = this as Product;
  product.product_slug = slugify(product.product_name, { lower: true, replacement: '_' });
  next();
});
// ProductSchema.index({ product_name: 1, product_description: 1 });
