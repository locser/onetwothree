import { KeyTokenDocument } from '@module/key-token/entities/key-token.model';

import { ApiKey, ApiKeyDocument } from '@module/api-token/entities/api-key.model';
import { ApiKeyRepositoryInterface } from '@module/api-token/interfaces/api-key.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model, PopulateOptions, Schema } from 'mongoose';
import { CONNECT_DB_NAME, FindAllResponse } from 'src/constants';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class ApiKeyRepository extends BaseRepositoryAbstract<ApiKey> implements ApiKeyRepositoryInterface {
  constructor(
    @InjectModel(ApiKey.name, CONNECT_DB_NAME)
    private readonly apiKeyModel: Model<ApiKey>,
  ) {
    super(apiKeyModel);
  }

  findOneAndUpdate(
    filter: object,
    update: object,
    options: object,
  ): Promise<Document<unknown, object, ApiKey> & ApiKey & Required<{ _id: string | Schema.Types.ObjectId }>> {
    return this.apiKeyModel.findOneAndUpdate(filter, update, options);
  }

  async findAllWithSubFields(
    condition: FilterQuery<KeyTokenDocument>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<ApiKeyDocument>> {
    const [count, items] = await Promise.all([
      this.apiKeyModel.count({ ...condition, deleted_at: null }),
      this.apiKeyModel.find({ ...condition, deleted_at: null }, projection).populate(populate),
    ]);
    return {
      count,
      items,
    };
  }
}
