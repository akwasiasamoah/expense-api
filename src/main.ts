import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { createClient } from 'redis';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //redis connection logic

  const redisClient = createClient({
    url: 'redis://localhost:6379',
  });

  app.use(
    session({
      secret: 'super_secret',
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
