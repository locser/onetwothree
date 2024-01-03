// import { Request } from 'express';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import { AuthService } from '../auth.service';
// import { TokenPayload } from '@module/user/interfaces/token.interface';

// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
//   constructor(private readonly authService: AuthService) {
//     super({
//       //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       //   ignoreExpiration: false,
//       //   secretOrKey: refresh_token_public_key,
//       //   passReqToCallback: true,
//     });
//   }

//   async validate(request: Request, payload: TokenPayload) {
//     // return await this.authService.getUserIfRefreshTokenMatched(payload.user_id, request.headers.authorization.split('Bearer ')[1]);
//   }
// }
