import { BaseEntity } from '@module/shared/base/base.entity';
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { BaseServiceInterface } from './base.interface.service';
import { FindAllResponse } from 'src/constants';

export abstract class BaseServiceAbstract<T extends BaseEntity> implements BaseServiceInterface<T> {
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(createDto: T | any): Promise<T> {
    return await this.repository.create(createDto);
  }

  // async findOneById(id: string): Promise<T> {
  //   return await this.repository.findOneById(id);
  // }

  // async findOneByCondition(condition = {}): Promise<T> {
  //     return await this.model
  //         .findOne({
  //             ...condition,
  //             deleted_at: null,
  //         })
  //         .exec();
  // }

  async findAll(filter?: object, projection?: string | object, options?: object): Promise<FindAllResponse<T>> {
    return await this.repository.findAll(filter, projection, options);
  }

  async findOne(id: string): Promise<T> {
    return await this.repository.findOneById(id);
  }

  async findOneByCondition(filter: Partial<T>) {
    return await this.repository.findOneByCondition(filter);
  }

  async findOneByConditionLean(filter: Partial<T>) {
    return await this.repository.findOneByConditionLean(filter);
  }

  async findOneAndUpdate(filter: Partial<T>, update: Partial<T>, options: Partial<T>) {
    return await this.repository.findOneAndUpdate(filter, update, options);
  }

  async update(id: string, update_dto: Partial<T>) {
    return await this.repository.update(id, update_dto);
  }

  async remove(id: string) {
    return await this.repository.softDelete(id);
  }
}
