import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PRODUCT_CLOTHING_COLLECTION_NAME } from 'src/constants';

export type ClothingDocument = mongoose.HydratedDocument<Clothing>;

@Schema({
  collection: PRODUCT_CLOTHING_COLLECTION_NAME,
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at',
  // },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Clothing {
  @Prop({
    type: String,
    required: true,
  })
  brand: string;

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
export const ClothingProductSchema = SchemaFactory.createForClass(Clothing);
