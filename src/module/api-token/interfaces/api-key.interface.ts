/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { ApiKey } from '../entities/api-key.model';

export interface ApiKeyRepositoryInterface extends BaseRepositoryInterface<ApiKey> {}
