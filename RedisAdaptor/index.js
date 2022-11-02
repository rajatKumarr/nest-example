import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import wildcardMiddleware from 'socketio-wildcard';

export class RedisIoAdapter extends IoAdapter {


  constructor(app) {
    super(app);
  }


  async connectToRedis(){
    const pubClient = createClient({ url: `redis://localhost:6379` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    console.log('connected...');
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port, options) {
    const server = super.createIOServer(port, options);
    server.use(wildcardMiddleware());
    server.adapter(this.adapterConstructor);
    // console.log(server);
    return server;
  }
}