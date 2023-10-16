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
    private readonly keysRepository: KeyTokensRepositoryInterface, // @InjectModel(User.name, CONNECT_DB_NAME) private userModel: Model<User>, // @InjectModel(KeyToken.name, CONNECT_DB_NAME) private keyModel: Model<KeyToken>, //HELPER
  ) {
    super(keysRepository);
  }

  async create(createDto: CreateKeyTokenDto): Promise<KeyToken> {
    try {
      const newKeyToken = await this.keysRepository.create({
        ...createDto,
      });
      return newKeyToken;
    } catch (error) {
      console.log('KeyTokenService ~ create ~ error:', error);
      return null;
    }
  }
  async findOneByCondition(filter: Partial<KeyToken>): Promise<KeyToken> {
    const hasKeyToken = await this.keysRepository.findOneByCondition(filter);
    return hasKeyToken;
  }
}
