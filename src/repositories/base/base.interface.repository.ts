import { FindAllResponse } from 'src/constants';

export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<T>;

  findOneById(id: string, projection?: string, option?: object): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  findOneByConditionLean(condition?: object, projection?: string): Promise<T>;

  findAll(condition: object, projection?: string | object, options?: object): Promise<FindAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;

  findOneAndUpdate(filter: object, update: object, options: object): Promise<T>;
}
