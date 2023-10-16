/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { KeyToken } from '../entities/key-token.model';

export interface KeyTokensRepositoryInterface extends BaseRepositoryInterface<KeyToken> {}
