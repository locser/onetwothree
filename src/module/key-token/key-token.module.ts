import { Module } from '@nestjs/common';
import { KeyTokenService } from './key-token.service';
import { KeyTokenController } from './key-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyToken, KeyTokenSchema } from './entities/key-token.model';
import { CONNECT_DB_NAME } from 'src/constants';
import { KeyTokensRepository } from '@repositories/key-tokens.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: KeyToken.name,
          schema: KeyTokenSchema,
        },
      ],
      CONNECT_DB_NAME,
    ),
  ],
  controllers: [KeyTokenController],
  providers: [KeyTokenService, { provide: 'KeysRepositoryInterface', useClass: KeyTokensRepository }],
  exports: [KeyTokenService],
})
export class KeyTokenModule {}
