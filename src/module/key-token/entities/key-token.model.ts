import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { KEY_TOKEN_COLLECTION_NAME } from 'src/constants';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '@module/shared/base/base.entity';

export type KeyTokenDocument = mongoose.HydratedDocument<KeyToken>;

@Schema({
  collection: KEY_TOKEN_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class KeyToken extends BaseEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: String,
    required: [true, 'privateKey is not empty'],
  })
  privateKey: string;

  @Prop({
    type: String,
    required: [true, 'publicKey is not empty'],
  })
  publicKey: string;

  @Prop({
    type: String,
    // required: [true, 'refreshToken is not empty'],
  })
  refreshToken: string;

  @Prop({
    type: Array,
  })
  refreshTokenUsed: string[];
}
export const KeyTokenSchema = SchemaFactory.createForClass(KeyToken);
