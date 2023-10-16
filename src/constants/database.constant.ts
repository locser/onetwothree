import { Prop } from '@nestjs/mongoose';

//EXPORT COLLECTION_NAME
export const CONNECT_DB_NAME = 'LEARNING';
export const USER_COLLECTION_NAME = 'users';
export const KEY_TOKEN_COLLECTION_NAME = 'keys';

/* EXPORT CLASS */

export enum SORT_TYPE {
  'DESC' = 'desc',
  'ASC' = 'acs',
}

export type FindAllResponse<T> = { count: number; items: T[] };

export type SortParams = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };

/** */
export const SALT_ROUND = 10;
