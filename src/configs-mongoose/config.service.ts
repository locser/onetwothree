import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class ConfigService {
  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: `${process.env.CONFIG_MONGOOSE_HOST}${process.env.CONFIG_MONGOOSE_DB_NAME}${process.env.CONFIG_MONGOOSE_OPTION}`,
    };
  }
}
