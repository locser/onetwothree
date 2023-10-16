import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { User, UserDocument } from '@module/user/entities/user.entity';
import { UsersRepositoryInterface } from '@module/user/interfaces/users.interface';
import { CONNECT_DB_NAME, FindAllResponse, USER_ROLE } from 'src/constants';

@Injectable()
export class UsersRepository extends BaseRepositoryAbstract<User> implements UsersRepositoryInterface {
  constructor(
    @InjectModel(User.name, CONNECT_DB_NAME)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findAllWithSubFields(
    condition: FilterQuery<UserDocument>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<UserDocument>> {
    const [count, items] = await Promise.all([
      this.userModel.count({ ...condition, deleted_at: null }),
      this.userModel.find({ ...condition, deleted_at: null }, projection).populate(populate),
    ]);
    return {
      count,
      items,
    };
  }
}
