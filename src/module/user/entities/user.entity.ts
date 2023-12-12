import { BaseEntity } from '@module/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { USER_COLLECTION_NAME, USER_STATUS } from 'src/constants';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({
  collection: USER_COLLECTION_NAME,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User extends BaseEntity {
  @Prop({
    required: true,
    // minlength: 2,
    // maxlength: 30,
    set: (name: string) => {
      return name.trim();
    },
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Please enter an nick name'],
    // minlength: 2,
    // maxlength: 15,
    unique: true,
    lowercase: true,
    // validate: [RegExp(/^[a-z0-9]+$/), 'Please enter a valid nickname (only letters and numbers are allowed)'],
  })
  nickName: string;

  @Prop({
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    // validate: [isEmail, 'Please enter a valid email'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please enter a valid password'],
    // minlength: [6, 'Minimum password length must be 6 characters'],
  })
  password: string;

  @Prop({
    // match: /^([+]\d{2})?\d{10}$/,
    get: (phone_number: string) => {
      if (!phone_number) {
        return;
      }
      const last_four_digits = phone_number.slice(phone_number.length - 4);
      return `***-***-${last_four_digits}`;
    },
  })
  phoneNumber: string;

  @Prop({
    // type: USER_ROLE,
    required: true,
    // enum: [USER_ROLE.MEMBER, USER_ROLE.MOD, USER_ROLE.ADMIN],
    default: 'MEMBER',
  })
  role: string;

  @Prop({
    default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  })
  avatar: string;

  @Prop({
    type: Number,
    required: true,
    // enum: USER_STATUS,
    default: USER_STATUS.NOT_ACTIVE,
  })
  status: number;

  @Prop()
  @Exclude()
  currentRefreshToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

// name
// nick_name
// email
// password
// role
// created_at
// updated_at
