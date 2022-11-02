import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class Gateway {
    // @WebSocketServer()
  
    @SubscribeMessage('*')
    findAll(...args){
        // console.log('here', args[1].data[1]);
      return { message: 'recieved' };
    }
  
    // @SubscribeMessage('identity')
    // async identity(data) {
    //   return data;
    // }
}