'use strict';
import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { KeyToken } from './entities/key-token.model';
import { CreateKeyTokenDto } from './dto/create-key-token.dto';
import { KeyTokensRepositoryInterface } from './interfaces/key-tokens.interface';

@Injectable()
export class KeyTokenService extends BaseServiceAbstract<KeyToken> {
  constructor(
    //MODEL
    @Inject('KeysRepositoryInterface')
    private readonly keysRepository: KeyTokensRepositoryInterface,
  ) {
    super(keysRepository);
  }

  async createKeyToken(createDto: CreateKeyTokenDto) {
    try {
      const filter = { user: createDto.user_id },
        update = {
          publicKey: createDto.publicKey,
          privateKey: createDto.privateKey,
          refreshToken: createDto.refreshToken,
          refreshTokenUsed: [],
        },
        options = { upsert: true, new: true };
      const tokens = await this.keysRepository.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log('KeyTokenService ~ create ~ error:', error);
      return null;
    }
  }
  async findOneByCondition(filter: object): Promise<KeyToken> {
    const hasKeyToken = await this.keysRepository.findOneByCondition(filter);
    return hasKeyToken;
  }
  async findOneByConditionLean(filter: object): Promise<KeyToken> {
    const hasKeyToken = await this.keysRepository.findOneByConditionLean(filter);
    return hasKeyToken;
  }

  async removeOneByCondition(filter: object): Promise<boolean> {
    return await this.keysRepository.removeOneByCondition(filter);
  }
}
