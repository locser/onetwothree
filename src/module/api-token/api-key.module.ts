import { KeyToken, KeyTokenSchema } from '@module/key-token/entities/key-token.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeyRepository } from '@repositories/api-key.repository';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';
import { ApiKey, ApiKeySchema } from './entities/api-key.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ApiKey.name,
        schema: ApiKeySchema,
      },
      {
        name: KeyToken.name,
        schema: KeyTokenSchema,
      },
    ]),
  ],
  controllers: [ApiKeyController],
  providers: [ApiKeyService, { provide: 'ApiKeysRepositoryInterface', useClass: ApiKeyRepository }],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
