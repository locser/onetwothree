import { ApiKeyModule } from '@module/api-token/api-key.module';
import { KeyTokenModule } from '@module/key-token/key-token.module';
import { UserModule } from '@module/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CartModule } from '@module/cart/cart.module';

@Module({
  imports: [UserModule, KeyTokenModule, ApiKeyModule, CartModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
