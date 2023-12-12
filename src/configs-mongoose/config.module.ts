import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config.service';
import * as Joi from 'joi';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
@Module({
  imports: [
    NestJsConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === ' production' ? '.env.prod' : '.env',
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('developer', 'production', 'test').default('developer'),
        PORT: Joi.number().default(5000),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => await configService.createMongooseOptions(),
      inject: [ConfigService],
    }),

    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   useFactory: async () => {
    //     return {
    //       store: await RedisStore.redisStore({
    //         url: `redis://:${process.env.CONFIG_REDIS_PASSWORD}@${process.env.CONFIG_REDIS_HOST}:${process.env.CONFIG_REDIS_PORT}/${process.env.CONFIG_REDIS_DB}`,
    //       }),
    //     };
    //   },
    //   isGlobal: true,
    // }),

    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   isGlobal: true,

    //   // // Store-specific configuration:
    //   // host: 'localhost',
    //   // port: 6379,
    // }),

    // CacheModule.register({
    //   store: redisStore as any,
    //   host: 'localhost', //default host
    //   port: 6379, //default port
    //   isGlobal: true,
    // }),
  ],

  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

/* Theo như tài liệu của NestJS thì truy cập trực tiếp vào process.env có thể không được tối ưu, việc sử dụng option cache giúp tăng hiệu năng khi ConfigService#get gọi đến các biến trong process.env.*/

/**Option expandVariables giúp chúng ta truy cập vào một biến môi trường khác trong file env. Ví dụ như bên dưới nếu không có option expandVariables thì kết quả khi gọi ConfigService#get('DATABASE_URI') sẽ là mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost thay vì mongodb://admin:admin@localhost */

/** Phạm vi bài viết này chúng ta sẽ dùng Joi để validate dữ liệu của biến môi trường để đảm bảo khi team member clone source code về phải cung cấp đủ các biến mới có thể sử dụng để tránh các lỗi không mong muốn. */

/** Joi cung cấp cho chúng ta nhiều option để thêm vào ConfigModule với các công dụng khác nhau tùy theo nhu cầu dự án để các bạn chọn. Ở đây mình chỉ sử dụng abortEarly: false để hiển thị toàn bộ các biến môi trường có lỗi thay vì mặc định chỉ hiển thị biến đầu tiên. Các bạn có thể tham khảo các option còn lại ở đây. https://joi.dev/api/?v=17.8.3#anyvalidatevalue-options */
