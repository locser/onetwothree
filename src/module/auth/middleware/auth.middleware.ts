import { ApiKeyService } from '@module/api-token/api-key.service';
import { KeyTokenService } from '@module/key-token/key-token.service';
import { UserService } from '@module/user/user.service';
import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'Authorization',
  REFRESH_TOKEN: 'refresh-token',
  X_CLIENT_ID: 'x-client-id',
  BEARER: 'Bearer ',
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly apiKeyService: ApiKeyService,
    private readonly keyTokenService: KeyTokenService,
  ) {}

  async use(req: Request | any, res: Response, next: () => void) {
    /**
     * HEADER:
     * CLIENT_ID :  user_id : check user_id missing
     * AUTHORIZATION : token :  get access token
     * verify token
     * check user in db
     * check keystore  with  this userId
     * OK all map user => next()
     */
    console.log('WTF man');

    try {
      // Kiểm tra CLIENT_ID
      const clientId = req.headers[HEADER.X_CLIENT_ID];
      if (!clientId) {
        return res.status(400).json({ status: 400, error: 'Missing CLIENT_ID' });
      }

      // Kiểm tra AUTHORIZATION và lấy access token
      const authorizationHeader = req.headers[HEADER.AUTHORIZATION];
      if (!authorizationHeader) {
        return res.status(400).json({ error: 'Missing AUTHORIZATION header' });
      }

      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        throw new UnauthorizedException('#01 - AuthMiddleware: không có token');
      }

      // lấy ra danh sách key, sau đó kiểm tra status và lấy role cho user rồi đưa đi
      const keyToken = await this.keyTokenService.findOneByConditionLean({ user: clientId });
      console.log('AuthMiddleware ~ use ~ keyToken:', keyToken);

      req.user = { _id: keyToken.user._id, role: 'MEMBER' };
      next();
    } catch (error) {
      throw new ForbiddenException('Xin Lỗi! Truy cập không hợp lệ.');
    }
  }
}
