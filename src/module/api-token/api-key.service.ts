import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { ApiKey } from './entities/api-key.model';
import { ApiKeyRepositoryInterface } from './interfaces/api-key.interface';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

@Injectable()
export class ApiKeyService extends BaseServiceAbstract<ApiKey> {
  constructor(
    @Inject('ApiKeysRepositoryInterface')
    private readonly apiKeyRepository: ApiKeyRepositoryInterface,
  ) {
    super(apiKeyRepository);
  }

  async createApiKey(createDto: CreateApiKeyDto): Promise<ApiKey> {
    try {
      return await this.apiKeyRepository.create({
        key: createDto.key,
        status: createDto.status,
        permissions: createDto.permissions,
      });
    } catch (error) {
      console.log('ApiKeyService ~ create ~ error:', error);
    }
  }
  async findOneByCondition(filter: Partial<ApiKey>): Promise<ApiKey> {
    const hasApiKey = await this.apiKeyRepository.findOneByCondition(filter);
    return hasApiKey;
  }

  async findOneByConditionLean(filter: Partial<ApiKey>): Promise<ApiKey> {
    const hasApiKey = await this.apiKeyRepository.findOneByCondition(filter);
    return hasApiKey;
  }
}
