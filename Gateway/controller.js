import { Controller, Get, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
@Controller('/api')
export class GatewayController {
  constructor() {
    this.client = ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
    });
  }

  @Get()
  async handleRequest() {
    const data = await this.client.send('iam:iam:get', { test: 'hey' }).toPromise().catch(console.error);
    return data;
  }
}

