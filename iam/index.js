import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './iamModule';


async function startService() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
  console.log(app.Module);
}

startService();
