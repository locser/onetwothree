import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { INVENTORY_COLLECTION_NAME } from 'src/constants';

export type InventoryDocument = mongoose.HydratedDocument<Inventory>;

@Schema({
  collection: INVENTORY_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    // getters: true,
    // virtuals: true,
  },
})
export class Inventory extends BaseEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  inventory_product_id: Types.ObjectId | string;

  @Prop({
    type: String,
    default: 'un_know',
  })
  inventory_location: string;

  @Prop({
    type: Number,
    required: [true, 'publicKey is not empty'],
  })
  inventory_stock: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  inventory_user_id: Types.ObjectId | string;

  @Prop({
    type: Array,
    default: [],
  })
  // danh sách số lượng sản phẩm được thêm vào giỏ hàng
  /**
   * cartId
   * stock: 1
   * createOn
   */
  inventory_reservations: any;
}
export const InventorySchema = SchemaFactory.createForClass(Inventory);
