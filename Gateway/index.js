import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from '../RedisAdaptor/index';
import { AppModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(3001);
}
bootstrap();
