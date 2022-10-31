import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './iamModule';


async function startService() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      });
    await app.listen();
    console.log(app.Module);
}

startService();