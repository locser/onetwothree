import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PRODUCT_ELECTRONIC_COLLECTION_NAME } from 'src/constants';

export type ClothingDocument = mongoose.HydratedDocument<Electronic>;

@Schema({
  collection: PRODUCT_ELECTRONIC_COLLECTION_NAME,
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at',
  // },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Electronic {
  @Prop({
    type: String,
    required: true,
  })
  manufacturer: string;

  @Prop({
    type: String,
    required: true,
  })
  model: string;

  @Prop({
    type: String,
    required: true,
  })
  color: string;
}
export const ElectronicProductSchema = SchemaFactory.createForClass(Electronic);
