import { KeyTokenModule } from '@module/key-token/key-token.module';
import { UserModule } from '@module/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { ApiKeyModule } from '@module/api-token/api-key.module';

@Module({
  imports: [UserModule, KeyTokenModule, ApiKeyModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
