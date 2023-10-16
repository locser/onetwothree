/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { User } from '../entities/user.entity';
import { FindAllResponse } from 'src/constants';

export interface UsersRepositoryInterface extends BaseRepositoryInterface<User> {
  findAllWithSubFields(condition: object, projection?: string, populate?: string[] | any): Promise<FindAllResponse<User>>;
}
