import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiModule } from 'src/api';

import {
  DomainExceptionFilter,
  HardErrorFilter,
  HttpExceptionFilter
} from 'src/common';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor
} from 'src/common';

import {
  ServerConfigType,
  SERVER_CONFIG,
} from 'src/domain';

const CORS_CONFIG = {
  origin: '*',
  maxAge: 86400
};

const COMPRESSION_CONFIG = {
  level: 1,
  memLevel: 1
};

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.setGlobalPrefix('/api/v1');
  app.enableCors(CORS_CONFIG);
  app.use(compression(COMPRESSION_CONFIG));
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new HardErrorFilter(),
    new HttpExceptionFilter()
  );
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
    new VersionInterceptor()
  );

  const config = new DocumentBuilder()
    .setTitle('Title')
    .setDescription('Description')
    .setVersion('Version')
    .setContact('AuthorName', 'AuthorWebsite', 'AuthorEmail')
    .setLicense('LicenseName', 'LicenseUrl')
    .addBearerAuth()
    .addTag('Tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('SwaggerPath', app, document);

  const configService = app.get(ConfigService);
  const serverConfig = configService.get<ServerConfigType>(SERVER_CONFIG);

  await app.listen(serverConfig.port, () => {
    console.log('dfjsdjhfsjdfjksdf')
  });
}

bootstrap();
