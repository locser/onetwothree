import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as moment from 'moment-timezone';
import { ConfigModule } from './configs-mongoose/config.module';
import { KeyTokenModule } from './module/key-token/key-token.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ApiKeyModule } from '@module/api-token/api-key.module';
import { ProductModule } from '@module/product/product.module';

@Module({
  imports: [ConfigModule, UserModule, KeyTokenModule, AuthModule, ApiKeyModule, ProductModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'moment-timezone',
      useValue: moment.tz.setDefault('GMT0'),
    },
  ],
})
export class AppModule {}
