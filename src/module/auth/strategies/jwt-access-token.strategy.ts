// import { ApiKeyService } from '@module/api-token/api-key.service';
// import { TokenPayload } from '@module/user/interfaces/token.interface';
// import { UserService } from '@module/user/user.service';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly usersService: UserService, private readonly apiKeyService: ApiKeyService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: true,
//       secretOrKey: '',
//     });
//   }

//   async validate(payload: TokenPayload) {
//     return await this.usersService.findOne(payload.user_id);
//   }

//   async getPublicKeyByUserId(user_id: string) {
//     // const apiKey = await this.apiKeyService.findOneByCondition({user_id: });
//   }
// }
