import { FindAllResponse, FindAllResponseLean } from 'src/constants';

export interface BaseRepositoryInterface<T> {
  createNew(dto: T | any): Promise<T>;

  hasExist(filter: object): Promise<boolean>;

  findOneById(id: string, projection?: string, option?: object): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  findOneByConditionLean(condition?: object, projection?: string): Promise<T>;

  findAll(condition: object, projection?: string | object, options?: object): Promise<FindAllResponse<T>>;

  findAllLean(condition: object, projection?: string | object, options?: object): Promise<FindAllResponseLean>;

  update(id: string, dto: Partial<T>): Promise<T>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;

  findOneAndUpdate(filter: object, update: object, options: object): Promise<T>;

  removeOneByCondition(filter: object): Promise<boolean>;
}
