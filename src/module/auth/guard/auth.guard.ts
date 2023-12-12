import { KeyTokenService } from '@module/key-token/key-token.service';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
// import { ExceptionResponse } from 'src/interceptors/base-response.response';
import * as JWT from 'jsonwebtoken';
import { ExceptionResponse } from 'package-one-two-three';
import { CatchException } from 'src/interceptors/exception-response';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'refresh-token',
  X_CLIENT_ID: 'x-client-id',
  BEARER: 'Bearer ',
};

@Injectable()
export class AuthGuardVip implements CanActivate {
  constructor(private readonly keyTokenService: KeyTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest<Request>();

      // Kiểm tra CLIENT_ID
      const clientId = req.headers[HEADER?.X_CLIENT_ID];
      if (!clientId) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#01#AuthGuard: Truy cập không được xác định');
      }

      const accessToken = this.extractTokenFromHeader(req);

      if (!accessToken) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#02#AuthGuard: Vui lòng đăng nhập lại!');
      }
      // loại bỏ Bearer

      // lấy ra private key để decode
      const keyToken = await this.keyTokenService.findOneByConditionLean({ user: clientId });

      //nếu key-token không có thì user đó không tồn tại
      if (!keyToken) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#03#AuthGuard: Không thể xác thực người dùng');

      const decodeUser: any = this.verifyJwt(accessToken, keyToken.privateKey);

      // sau khi decode trong access token sẽ có { userId: hasUser._id }
      if (clientId !== decodeUser._id.toString())
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, '#04#AuthGuard: Truy cập đã bị sửa đổi');

      req.user = { _id: clientId, role: 'MEMBER' };
      return true;
    } catch (error) {
      console.log('AuthGuardVip ~ canActivate ~ error:', error);
      throw new CatchException(error);
    }
  }

  verifyJwt(token: string, keySecret: string) {
    return JWT.verify(token, keySecret, (err, decode) => {
      if (err) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'AuthGuardVip ~ verifyJwt ~ verifyJwt: verify token thất bại');
      } else {
        // console.log('AuthGuardVip ~ verifyJwt ~ verifyJwt: success - ', decode);
        return decode;
      }
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
