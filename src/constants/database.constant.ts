//EXPORT COLLECTION_NAME
// export const CONNECT_DB_NAME = 'LEARNING';
export const USER_COLLECTION_NAME = 'users'; // cho user
export const KEY_TOKEN_COLLECTION_NAME = 'keys'; // lưu token của user
export const API_TOKEN_COLLECTION_NAME = 'apiKeys'; // check token có hợp lệ
export const PRODUCT_COLLECTION_NAME = 'products'; // product
export const PRODUCT_CLOTHING_COLLECTION_NAME = 'clothings'; // product clothings
export const PRODUCT_ELECTRONIC_COLLECTION_NAME = 'electronic'; // product electronic
export const PRODUCT_DECOR_COLLECTION_NAME = 'decors'; // product
export const INVENTORY_COLLECTION_NAME = 'inventories';

/* EXPORT CLASS */

enum SORT_TYPE {
  DESC = 'desc',
  ASC = 'asc',
}

export enum QUERY_FLAG {
  TRUE = 1,
  FALSE = 0,
}

export type FindAllResponse<T> = { count: number; items: T[] };
export type FindAllResponseLean = { count: number; items: object[] };

export type SortParams = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keyword: string; field: string };

export type PaginateParams = { offset: number; limit: number };

/** */
export const SALT_ROUND = 10;
