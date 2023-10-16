import { KeyTokenService } from '@module/key-token/key-token.service';
import { UserService } from '@module/user/user.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import * as crypto from 'node:crypto';
import { SALT_ROUND } from 'src/constants';
import { SignUpDto } from './dto/sign-up.dto';
// import * as crypto from 'crypto';
import { User } from '@module/user/entities/user.entity';
import { getInfoData } from 'src/utils/get-info-data';

@Injectable()
export class AuthService {
  constructor(
    //SERVICE
    private readonly userService: UserService,
    private readonly keyService: KeyTokenService, //HELPER
  ) {}

  async signIn(user_id: string) {
    // const hasUser = await this.userService.findUserByEmail();
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    // mọi thứ hoàn tất, tạo token từ publicKeyObject, và privateKey phía trên:     // generate token
    const tokenPair: { accessToken: string; refreshToken: string } = await this.createTokenPair({
      payload: { userId: user_id },
      publicKey: publicKey,
      privateKey: privateKey,
    });

    return {
      user_id: user_id,
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
        //tạo key
        // const { privateKey, publicKey } = this.generateKeyForNewUser();
        // phức tạp chưa cần tới

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        // mọi thứ hoàn tất, tạo token từ publicKeyObject, và privateKey phía trên:
        const tokenPair: { accessToken: string; refreshToken: string } = await this.createTokenPair({
          payload: { userId: newUser._id },
          publicKey: publicKey,
          privateKey: privateKey,
        });

        console.log('UserService ~ signUp ~ tokenPair:', tokenPair);

        //lưu lại publicKey của User mới tạo, trả về publicKey sau khi chuyển qua string
        const refreshToken: string = await this.createKeyToken({
          userId: newUser._id,
          refreshToken: tokenPair.refreshToken,
        });

        if (!refreshToken) {
          throw new Error('UserService ~ signUp: #00-privateKeyString lỗi');
        }

        // do publicKey lưu trong db không lưu dưới dạng mã rsa tạo ra được, nên nó lưu dạng string,nên lấy ra thì phải tạo lại key từ đoạn string đó
        // const privateKeyObject: crypto.KeyObject = crypto.createPrivateKey(privateKeyString);
        // if (!privateKeyObject) {
        //   throw new Error('UserService ~ signUp: #01-privateKeyObject lỗi');
        // }

        return {
          code: 201,
          metadata: {
            user: getInfoData({ fields: ['_id', 'name', 'nickName'], object: newUser }),
            tokens: {
              accessToken: tokenPair.accessToken,
              refreshToken: refreshToken,
            },
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
    }
  }

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

  /**SUB FUNC */

  private async createKeyToken({ userId, refreshToken }) {
    try {
      const tokens = await this.keyService.create({
        user: userId,
        refreshToken: refreshToken,
      });

      return tokens ? tokens.refreshToken : null;
    } catch (error) {
      console.log('UserService ~ createKeyToken ~ error:', error);
    }
  }

  // async createTokenPair(data: { payload: any; publicKey: string; privateKey: crypto.KeyObject }) {
  async createTokenPair(data: { payload: any; publicKey: string; privateKey: string }) {
    try {
      //accessToken
      const accessToken = JWT.sign(data.payload, data.privateKey, {
        // algorithm: 'RS256',
        expiresIn: '20 days',
      });

      //create refresh token
      const refreshToken = JWT.sign(data.payload, data.privateKey, {
        // algorithm: 'RS256',
        expiresIn: '30 days',
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
    const token = await this.keyService.findOne(userId);
    return token.publicKey;
  }

  // private generateKeyForNewUser() {
  //   return crypto.generateKeyPairSync('rsa', {
  //     modulusLength: 4096,
  //     publicKeyEncoding: {
  //       type: 'pkcs1',
  //       format: 'pem',
  //     },
  //     privateKeyEncoding: {
  //       type: 'pkcs1',
  //       format: 'pem',
  //     },
  //   });
  // }
}
