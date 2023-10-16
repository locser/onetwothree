import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { CONNECT_DB_NAME } from 'src/constants';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { UsersRepository } from '@repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
      ],
      CONNECT_DB_NAME,
    ),
    // MongooseModule.forFeatureAsync(
    //   [
    //     {
    //       name: User.name,
    //       schema: UserSchema,
    //       inject: [getModelToken()],
    //       imports: [MongooseModule.forFeature([{ name: FlashCard.name, schema: FlashCardSchema }])],
    //     },
    //   ],
    //   CONNECT_DB_NAME,
    // ),
  ],
  controllers: [UserController],
  providers: [UserService, { provide: 'UsersRepositoryInterface', useClass: UsersRepository }],
  exports: [UserService],
})
export class UserModule {}
