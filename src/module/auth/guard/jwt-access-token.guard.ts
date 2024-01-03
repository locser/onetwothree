// import { KeyTokenService } from '@module/key-token/key-token.service';
// import { UserService } from '@module/user/user.service';
// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
// import { IS_PUBLIC_KEY } from 'src/decorators/auth.decorator';

// @Injectable()
// export class JwtAccessTokenGuard extends AuthGuard('jwt') {
//   constructor(private keyTokensService: KeyTokenService, private usersService: UserService, private reflector: Reflector) {
//     super();
//   }
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
//     if (isPublic) {
//       return true;
//     }
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }

// /**
// 	* export class JwtAccessTokenGuard extends AuthGuard('jwt'): Đây là một class JwtAccessTokenGuard mở rộng từ AuthGuard và sử dụng strategy jwt.
// 	AuthGuard là một class được cung cấp bởi thư viện @nestjs/passport để xác thực và bảo vệ các route dựa trên các strategies như JWT, OAuth, v.v.

// constructor(private reflector: Reflector): Constructor của class JwtAccessTokenGuard nhận một đối tượng reflector thông qua dependency injection.
// Reflector là một service được cung cấp bởi NestJS để truy cập và thao tác các metadata của các class và phương thức.

// canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>: Phương thức canActivate được ghi đè từ AuthGuard.
// Đây là một phương thức chịu trách nhiệm kiểm tra xem người dùng có quyền truy cập vào route hay không.

// const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]):
// Đầu tiên, phương thức này sử dụng reflector để truy cập metadata được gắn với route hiện tại. Nó tìm và lấy giá trị của metadata có key là IS_PUBLIC_KEY từ phương thức và class của route.
// IS_PUBLIC_KEY có thể là một hằng số định nghĩa trước.

// if (isPublic) { return true; }: Nếu giá trị của metadata isPublic là true, tức là route được đánh dấu là công khai (public), phương thức canActivate trả về true để cho phép truy cập vào route.

// return super.canActivate(context);: Nếu route không được đánh dấu là công khai,
// phương thức canActivate gọi phương thức canActivate của superclass AuthGuard để kiểm tra xác thực người dùng sử dụng strategy jwt.
// */
