import { KeyToken, KeyTokenDocument } from '@module/key-token/entities/key-token.model';
import { KeyTokensRepositoryInterface } from '@module/key-token/interfaces/key-tokens.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { FindAllResponse } from 'src/constants';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class KeyTokensRepository extends BaseRepositoryAbstract<KeyToken> implements KeyTokensRepositoryInterface {
  constructor(
    @InjectModel(KeyToken.name)
    private readonly keyTokenModel: Model<KeyToken>,
  ) {
    super(keyTokenModel);
  }

  async findAllWithSubFields(
    condition: FilterQuery<KeyTokenDocument>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<KeyTokenDocument>> {
    const [count, items] = await Promise.all([
      this.keyTokenModel.count({ ...condition, deleted_at: null }),
      this.keyTokenModel.find({ ...condition, deleted_at: null }, projection).populate(populate),
    ]);
    return {
      count,
      items,
    };
  }
}
