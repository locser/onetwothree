import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PRODUCT_DECOR_COLLECTION_NAME } from 'src/constants';
import { DECOR_PLACEMENT_TYPE } from 'src/constants/product.constant';

export type DecorDocument = mongoose.HydratedDocument<Decor>;

@Schema({
  collection: PRODUCT_DECOR_COLLECTION_NAME,
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at',
  // },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Decor {
  @Prop({
    type: Number,
    required: true,
    enum: DECOR_PLACEMENT_TYPE,
  })
  placement: number;

  @Prop({
    type: String,
    required: true,
  })
  size: string;

  @Prop({
    type: String,
    required: true,
  })
  material: string;
}
export const DecorProductSchema = SchemaFactory.createForClass(Decor);
