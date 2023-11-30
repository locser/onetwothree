import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_ROLE } from 'src/constants';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { CreateUserDto } from './dto/create-user-dto.dto';
import { User } from './entities/user.entity';
import { UsersRepositoryInterface } from './interfaces/users.interface';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(
    //MODEL
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {
    super(usersRepository);
  }

  async create(createDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.createNew({
      ...createDto,
      role: 'MEMBER',
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneByCondition({ email });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // async findAll(filter?: object, projection?: string): Promise<FindAllResponse<User>> {
  //   return await this.usersRepository.findAllWithSubFields(filter, projection, 'role');
  // }

  // async signUp(createUserDto: CreateUserDto) {
  //   try {
  //     const { name, nick_name, email, password } = createUserDto;
  //     // check dto => chuyển qua dto
  //     if (!name || !password || !email || !nick_name) {
  //       throw new Error('#01 UserService ~ register:Vui lòng nhập đầy đủ thông tin các trường');
  //     }
  //     //kiểm tra email có hợp lệ hay không
  //     // const hasUser = await this.usersRepository;
  //     // if (hasUser) {
  //     //   throw new Error('#02 UserService ~ register: Email này đã được sử dụng');
  //     // }
  //     // hàm băm xử lý password
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     // tạo user mới
  //     const newUser = await this.usersRepository.create({
  //       name: name,
  //       nick_name: nick_name,
  //       email: email,
  //       password: hashedPassword,
  //       role: USER_ROLE.MEMBER,
  //     });

  //     //nếu tạo user thành công thì chúng ta sẽ tạo khóa cho user đó: publicKey và privateKey
  //     if (newUser) {
  //       //tạo key
  //       const { privateKey, publicKey } = this.generateKeyForNewUser();

  //       //lưu lại publicKey của User mới tạo, trả về publicKey sau khi chuyển qua string
  //       const publicKeyString = await this.createKeyToken({
  //         userId: newUser._id,
  //         publicKey,
  //       });
  //       console.log('UserService ~ signUp ~ publicKeyString:', publicKeyString);

  //       if (!publicKeyString) {
  //         throw new Error('UserService ~ signUp: #00-publicKeyString lỗi');
  //       }

  //       // do publicKey lưu trong db không lưu dưới dạng mã rsa tạo ra được, nên nó lưu dạng string,nên lấy ra thì phải tạo lại key từ đoạn string đó
  //       const publicKeyObject: KeyObject = crypto.createPublicKey(publicKeyString);
  //       if (!publicKeyObject) {
  //         throw new Error('UserService ~ signUp: #01-publicKeyString lỗi');
  //       }

  //       // mọi thứ hoàn tất, tạo token từ publicKeyObject, và privateKey phía trên:
  //       const tokenPair = await this.createTokenPair({
  //         payload: { userId: newUser._id, name: newUser.name, role: newUser.role, email: newUser.email },
  //         publicKey: publicKeyObject,
  //         privateKey: privateKey,
  //       });
  //       console.log('UserService ~ signUp ~ tokenPair:', tokenPair);

  //       return {
  //         code: 201,
  //         metadata: {
  //           user: newUser,
  //           token: tokenPair,
  //         },
  //       };
  //     }
  //     // nếu không sẽ trả về lỗi:
  //     return {
  //       code: 200,
  //       metadata: null,
  //     };
  //   } catch (error) {
  //     console.log('UserService ~ register ~ error:', error);
  //   }
  // }

  /**==================SUB FUNCTION===================== */
  // NOTE: thuật toán sử dujgn rsa
  // Hàm này tạo key cho user nó sẽ trả về 1 object : { privateKey, publicKey }
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

  // private async createKeyToken({ userId, publicKey }) {
  //   try {
  //     const publicKeyString = publicKey.toString();
  //     const tokens = await this.keyModel.create({
  //       user: userId,
  //       public_key: publicKeyString,
  //     });

  //     return tokens ? tokens.public_key : null;
  //   } catch (error) {
  //     console.log('UserService ~ createKeyToken ~ error:', error);
  //   }
  // }

  // async createTokenPair(data: { payload: any; publicKey: KeyObject; privateKey: string }) {
  //   try {
  //     //accessToken
  //     const accessToken = JWT.sign(data.payload, data.privateKey, {
  //       algorithm: 'RS256',
  //       expiresIn: '20 days',
  //     });

  //     //create refresh token
  //     const refreshToken = JWT.sign(data.payload, data.privateKey, {
  //       algorithm: 'RS256',
  //       expiresIn: '30 days',
  //     });

  //     //
  //     JWT.verify(accessToken, data.publicKey, (err, decode) => {
  //       if (err) {
  //         console.log('error verify:', err);
  //       } else {
  //         console.log('decode verify:', decode);
  //       }
  //     });

  //     return { accessToken, refreshToken };
  //   } catch (error) {
  //     console.log('UserService ~ createTokenPair ~ error:', error);
  //   }
  // }
}
