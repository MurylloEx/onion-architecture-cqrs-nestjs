import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ApiModule } from 'src/api';
import { ServerConfigType, SERVER_CONFIG } from 'src/common'; 

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<ServerConfigType>(SERVER_CONFIG);
  await app.listen(port);
}

bootstrap();
