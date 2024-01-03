import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { createClient } from 'redis';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  //redis connection logic

  const redisClient = createClient({
    url: configService.getOrThrow('REDIS_URL'),
  });

  app.use(
    session({
      secret: configService.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
      }),
    }),
  );

  await redisClient.connect().catch((error) => {
    throw error;
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  ),
    await app.listen(3333);
}
bootstrap();
