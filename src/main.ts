import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

enum VERSION {
  V1 = 'v1',
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.connectMicroservice<MicroserviceOptions>(grpcServerOptions);
  // await app.startAllMicroservices();

  // init middlewares
  app
    .enableVersioning({
      type: VersioningType.URI,
    })
    .setGlobalPrefix(process.env.CONFIG_PREFIX);

  app.enableCors({
    origin: '*',
  });
  // app.use(morgan('dev'));
  app.use(morgan('short'));
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // init swagger
  if (process.env.CONFIG_PRODUCTION_MODE === 'developer') {
    const configV1 = new DocumentBuilder().addBearerAuth().setTitle(``).setDescription(``).setVersion('1.0.01').build();
    const documentV1 = SwaggerModule.createDocument(app, configV1, {
      include: [],
      deepScanRoutes: true,
    });
    SwaggerModule.setup(process.env.CONFIG_PREFIX + 'docs', app, documentV1, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  await app.listen(process.env.CONFIG_PORT, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger Service is running on: ${await app.getUrl()}/${process.env.CONFIG_PREFIX}docs`);
}
bootstrap();
