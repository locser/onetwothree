import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { API_TOKEN_COLLECTION_NAME } from 'src/constants';

export type ApiKeyDocument = mongoose.HydratedDocument<ApiKey>;

@Schema({
  collection: API_TOKEN_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class ApiKey extends BaseEntity {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  key: string;

  @Prop({
    type: Number,
    default: true,
  })
  status: number;

  @Prop({
    type: String,
    required: true,
    // enum: USER_ROLE,
  })
  permissions: string;
}
export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
