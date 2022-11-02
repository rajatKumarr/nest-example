import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { Emitter } from "@socket.io/redis-emitter";
import { createClient } from "redis";

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

const redisClient = createClient({ url: "redis://localhost:6379" });


@Controller()
export class IamController {
  @MessagePattern('iam:iam:get')
  async handler(...args) {
    console.log(args);
    await redisClient.connect();
    const emitter = new Emitter(redisClient);
    emitter.emit('data', { message: 'Hey there' });
    return 'hey there senorita';
  }

}


