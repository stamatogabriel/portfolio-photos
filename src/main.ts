import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { urlencoded } from 'body-parser';

import { AppModule } from './app.module';

import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Users DDD example')
    .setDescription('The users DDD API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.use(urlencoded({ extended: true }));

  app.use(helmet());

  app.enableCors();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
