import { FindAllResponse } from 'src/constants';

export interface Write<T> {
  createNew(item: T | any): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
  findOneAndUpdate(filter: Partial<T>, update: Partial<T>, options: Partial<T>);
  removeOneByCondition(filter: Partial<T>): Promise<boolean>;
}

export interface Read<T> {
  findAll(filter?: object, options?: object): Promise<FindAllResponse<T>>;
  findOne(id: string): Promise<T>;
  findOneByCondition(filter: Partial<T>): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
