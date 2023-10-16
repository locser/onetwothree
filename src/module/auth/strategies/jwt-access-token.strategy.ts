import { TokenPayload } from '@module/user/interfaces/token.interface';
import { UserService } from '@module/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessTokenStrategy {
  constructor(private readonly usersService: UserService) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: true,
    // });
  }

  async validate(payload: TokenPayload) {
    return await this.usersService.findOne(payload.user_id);
  }
}
