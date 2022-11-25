import { join } from 'path';
import { json } from 'express';
import * as compression from 'compression';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { ApiModule } from 'src/api';

import {
  WsCommonAdapter,
  LoggingService,
  ConfigurationService,
  DomainExceptionFilter,
  HardErrorFilter,
  HttpExceptionFilter
} from 'src/common';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor
} from 'src/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);

  const reflector = app.get(Reflector);
  const config = app.get(ConfigurationService);
  const logger = app.get(LoggingService);

  app.enableCors(config.configureCors());
  app.setGlobalPrefix(config.configureServerGlobalPrefix());
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, 'assets/views'));
  app.useStaticAssets(join(__dirname, 'assets/static'));
  app.use(json({ limit: '10mb' }));
  app.use(compression(config.configureCompression()));
  app.useWebSocketAdapter(WsCommonAdapter.fromApp(app));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.useGlobalFilters(
    new HardErrorFilter(logger),
    new HttpExceptionFilter(logger),
    new DomainExceptionFilter(logger)
  );
  app.useGlobalInterceptors(
    new ResponseInterceptor(reflector),
    new TimeoutInterceptor(),
    new VersionInterceptor(config, reflector),
    new ClassSerializerInterceptor(reflector)
  );

  const swaggerOptions = config.configureSwagger().build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(config.configureSwaggerPath(), app, document);

  app.listen(config.configureServerPort())
    .then(() => logger.deploySuccess())
    .catch((error) => logger.deployFailed(error));
}

bootstrap();
