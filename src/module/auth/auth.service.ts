import { KeyTokenService } from '@module/key-token/key-token.service';
import { UserService } from '@module/user/user.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import * as crypto from 'node:crypto';
import { SALT_ROUND } from 'src/constants';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiKeyService } from '@module/api-token/api-key.service';
import { User } from '@module/user/entities/user.entity';
import { getInfoData } from 'src/utils/get-info-data';
import { CartService } from '@module/cart/cart.service';

const size = 8; //64

@Injectable()
export class AuthService {
  async logout(user_id: string) {
    console.log('logout ~ user_id:', user_id);
    await this.keyTokenService.removeOneByCondition({ user: user_id });

    return 'LogOut thành công.';
  }
  constructor(
    //SERVICE
    private readonly userService: UserService,
    private readonly keyTokenService: KeyTokenService,
    private readonly apiKeyService: ApiKeyService,
    private readonly cartService: CartService, //HELPER
  ) {}

  async signIn(email: string, password: string) {
    const hasUser = await this.getAuthenticatedUser(email, password);
    const privateKey = crypto.randomBytes(size).toString('hex');
    const publicKey = crypto.randomBytes(size).toString('hex');

    // mọi thứ hoàn tất, tạo token từ publicKeyObject, và privateKey phía trên:     // generate token
    const tokenPair: { accessToken: string; refreshToken: string } = await this.createTokenPair({
      payload: { _id: hasUser._id },
      publicKey: publicKey,
      privateKey: privateKey,
    });

    await this.keyTokenService.createKeyToken({
      user_id: hasUser._id.toString(),
      privateKey: privateKey,
      publicKey: publicKey,
      refreshToken: tokenPair.refreshToken,
    });

    return {
      user: getInfoData({ fields: ['_id', 'name', 'email'], object: hasUser }),
      access_token: tokenPair.accessToken,
      refresh_token: tokenPair.refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      //   kiểm tra email có hợp lệ hay không
      const hasUser = await this.userService.findOneByCondition({
        email: signUpDto.email,
      });
      if (hasUser) {
        throw new ConflictException('#01 UserService ~ register: Email này đã được sử dụng');
      }

      const hasNickName = await this.userService.findOneByCondition({
        nickName: signUpDto.nick_name,
      });

      if (hasNickName) {
        throw new Error('#02 UserService ~ register: nickName này đã được sử dụng');
      }
      // hàm băm xử lý password
      const hashedPassword = await bcrypt.hash(signUpDto.password, SALT_ROUND);

      // tạo user mới
      const newUser = await this.userService.create({
        name: signUpDto.name,
        nickName: signUpDto.nick_name,
        email: signUpDto.email,
        password: hashedPassword,
      });

      //nếu tạo user thành công thì chúng ta sẽ tạo khóa cho user đó: publicKey và privateKey
      if (newUser) {
        //tạo luôn giỏ hàng

        await this.cartService.createCartService(newUser._id);

        //tạo key
        // const { privateKey, publicKey } = this.generateKeyForNewUser();
        // phức tạp chưa cần tới

        const privateKey = crypto.randomBytes(size).toString('hex');
        const publicKey = crypto.randomBytes(size).toString('hex');

        // mọi thứ hoàn tất, tạo token từ publicKeyObject, và privateKey phía trên:
        const tokenPair: { accessToken: string; refreshToken: string } = await this.createTokenPair({
          payload: { userId: newUser._id },
          publicKey: publicKey,
          privateKey: privateKey,
        });

        const key = await this.apiKeyService.createApiKey({
          key: publicKey,
          status: 1,
          permissions: 'MEMBER',
        });

        // console.log(tokenPair);

        return {
          code: 201,
          metadata: {
            user: getInfoData({ fields: ['_id', 'name', 'nickName'], object: newUser }),
            tokens: tokenPair,
            public_key: getInfoData({
              fields: ['key'],
              object: key,
            }),
          },
        };
      }
      // nếu không sẽ trả về lỗi:
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.log('UserService ~ register ~ error:', error);
      return {
        code: 200,
        metadata: {
          message: error,
        },
      };
    }
  }

  /**SUB FUNC */

  async getAuthenticatedUser(email: string, password: string): Promise<User> {
    try {
      // get user
      const user = await this.userService.findUserByEmail(email);
      // check password
      await this.verifyPlainContentWithHashedContent(password, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials!!');
    }
  }

  private async verifyPlainContentWithHashedContent(plainText: string, hashedText: string) {
    const is_matching = await bcrypt.compare(plainText, hashedText);
    if (!is_matching) {
      throw new BadRequestException();
    }
  }

  // private async createKeyToken({ userId, refreshToken, publicKey, privateKey }) {
  //   try {
  //     const tokens = await this.keyTokenService.create({
  //       user: userId,
  //       refreshToken: refreshToken,
  //       publicKey: publicKey,
  //       privateKey: privateKey,
  //     });

  //     return tokens ? tokens.refreshToken : null;
  //   } catch (error) {
  //     console.log('UserService ~ createKeyToken ~ error:', error);
  //   }
  // }

  // async createTokenPair(data: { payload: any; publicKey: string; privateKey: crypto.KeyObject }) {
  async createTokenPair(data: { payload: any; publicKey: string; privateKey: string }) {
    try {
      //accessToken
      const accessToken = JWT.sign(data.payload, data.privateKey, {
        // algorithm: 'RS256',
        expiresIn: '50 days',
      });

      // xác thực accessToken sử dụng publicKey
      JWT.verify(accessToken, data.privateKey, (err, decode) => {
        if (err) {
          console.error('error verify token');
        } else {
          console.log('decode jwt::', decode);
        }
      });

      //create refresh token
      const refreshToken = JWT.sign(data.payload, data.privateKey, {
        // algorithm: 'RS256',
        expiresIn: '50 days',
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.log('UserService ~ createTokenPair ~ error:', error);
    }
  }

  // Hàm validateToken. Xử lý 2 việc: Lấy publicKey từ DB + Xác thực (verify) token từ publicKey
  async validateToken(accessToken: string, userId: string) {
    // Lấy publicKey trong DB
    const publicKeyString = await this.getPublicKey(userId);
    // Convert publicKey từ dạng string về dạng rsa có thể đọc được
    const publicKeyObject = crypto.createPublicKey(publicKeyString);
    // xác thực accessToken sử dụng publicKey
    JWT.verify(accessToken, publicKeyObject, (err, decode) => {
      if (err) {
        console.error('error verify token');
      } else {
        console.log('decode jwt::', decode);
      }
    });
  }

  // Hàm lấy publicKey
  async getPublicKey(userId: string) {
    const token = await this.keyTokenService.findOne(userId);
    return token.publicKey;
  }
}
