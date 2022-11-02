import { Controller, Get, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Injectable()
@Controller('/api')
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class GatewayController {
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false
        },
      },
    });
  }

  @Get()
  async handleRequest() {
    const data = await this.client.send('iam:iam:get', { test: 'hey' }).toPromise().catch(console.error);
    return data;
  }
}

