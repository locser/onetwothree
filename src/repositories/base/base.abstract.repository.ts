import { BaseEntity } from '@module/shared/base/base.entity';
import { BaseRepositoryInterface } from './base.interface.repository';
import { FindAllResponse } from 'src/constants';
import { FilterQuery, Model, QueryOptions } from 'mongoose';

export abstract class BaseRepositoryAbstract<T extends BaseEntity> implements BaseRepositoryInterface<T> {
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }
  async create(dto: T | any): Promise<T> {
    return await this.model.create(dto);
  }
  async findOneById(id: string): Promise<T> {
    const item = await this.model.findById(id);
    return item.deleted_at ? null : item;
  }

  async findOneByCondition(condition: FilterQuery<T>): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
        deleted_at: null,
      })
      .exec();
  }

  async findOneByConditionLean(condition: FilterQuery<T>): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
      })
      .lean();
    // .exec();
  }

  async findAll(condition: FilterQuery<T>, options?: QueryOptions<T>): Promise<FindAllResponse<T>> {
    const [count, items] = await Promise.all([
      this.model.count({ ...condition, deleted_at: null }),
      this.model.find({ ...condition, deleted_at: null }, options?.projection, options),
    ]);
    return {
      count: count,
      items: items,
    };
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate({ _id: id, deleted_at: null }, dto, { new: true });
  }

  async findOneAndUpdate(filter: object, update: object, options: object) {
    return await this.model.findOneAndUpdate(filter, update, options);
  }

  async softDelete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }

    return !!(await this.model.findByIdAndUpdate<T>(id, { deleted_at: new Date() }).exec());
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }
    return !!(await this.model.findByIdAndDelete(id));
  }
}

/**
 * BaseRepositoryInterface là interface mà chúng ta sẽ quy định các method mà một repository phải có. Chúng ta cần phải thiết kế các interface làm sao cho nội dung không thay đổi dù có thay đổi ORM hoặc hệ quản trị cơ sở dữ liệu.
 * BaseRepositoryAbstract là class implement các method từ BaseRepositoryInterface, logic query tùy theo loại database sẽ được triển khai ở đây. Sẽ bị thay đổi khi đổi ORM hoặc hệ quản trị cơ sở dữ liệu.
 * T extends BaseEntity: chỉ định T sẽ bao gồm các field trong BaseEntity. Nếu không extends thì IDE sẽ báo lỗi Property deleted_at does not exist on... khi chúng ta gọi item.deleted_at bên trong các method của BaseRepositoryAbstract.
 *
 */
