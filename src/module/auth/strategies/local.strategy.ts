// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { USER_ROLE } from 'src/constants';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

//   async validate(email: string, password: string) {
//     const user = await this.authService.getAuthenticatedUser(email, password);
//     // let user: { _id: string; role: USER_ROLE } = await this.authService.getAuthenticatedUser(email, password);
//     // if (email == 'emailtest5@gmail.com' && password == 'test1234') user = { _id: '123', role: USER_ROLE.MEMBER };
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     console.log('LocalStrategy ~ validate ~ user:', user);
//     return user;
//   }
// }
