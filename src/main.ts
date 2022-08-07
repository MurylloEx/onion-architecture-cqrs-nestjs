import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';

import { ApiModule } from 'src/api';

import {
  ConfigurationService,
  DomainExceptionFilter,
  HardErrorFilter,
  HttpExceptionFilter,
  LoggingService
} from 'src/common';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor
} from 'src/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const config = app.get(ConfigurationService);
  const logger = app.get(LoggingService);

  app.setGlobalPrefix(config.configureServerGlobalPrefix());
  app.enableCors(config.configureCors());
  app.use(compression(config.configureCompression()));
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.useGlobalFilters(
    new DomainExceptionFilter(logger),
    new HardErrorFilter(logger),
    new HttpExceptionFilter(logger)
  );
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
    new VersionInterceptor()
  );

  const swaggerOptions = config.configureSwagger().build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(config.configureSwaggerPath(), app, document);

  app.listen(config.configureServerPort())
    .then(() => logger.deploySuccess())
    .catch((error) => logger.deployFailed(error));
}

bootstrap();
