// import { ServerRMQ } from '@nestjs/microservices';


// const server = new ServerRMQ({
//     urls: ['amqp://localhost:5672'],
//     queue: 'cats_queue',
//     queueOptions: {
//       durable: false
//     },
//   });

// server.addHandler('iam:iam:get', async data => {
//     console.log('In emitter', data);
//     return data.payload * 2;
// }, false);


// server.listen((err) => {
//     if(!err) {
//         console.log('server has started...');
//     }
// });

import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import controllers, { addController } from './controllers';
import { getClient, transporterConfig } from './transporter';


function innerLoader({ path, subscriber, handler, autoPublishChannel, alreadyRegistered, versions }) {
    if (handler) {
        return class Handler {
            constructor() {
                this.client = getClient();
            }
            @MessagePattern(path)
            async handler(data) {
                console.log('HERE', data);
                const { context, payload } = data;
                const result = await handler(context, payload);
                if (autoPublishChannel) {
                    await this.client.emit(path, { requestBody: data, responseBody: result }).toPromise();
                }
                console.log('<<<', result);
                return result;
            }
        }
    }
    if (subscriber) {
        return class Subscriber {
            @EventPattern(path)
            async subscriber(data) {
                const { context, payload } = data;
                const result = await subscriber(context, payload);
                console.log('result', result);
            }
        }
    }
}


export async function initService() {
    class LoaderModule { }

    const objectAppModule = {
        module: LoaderModule,
        imports: [],
        exports: [],
        controllers,
        providers: []
    }

    console.log(objectAppModule);

    const app = await NestFactory.createMicroservice(objectAppModule, transporterConfig);
    await app.listen();
}


export function loader(...args) {
    const controller = innerLoader(...args);
    addController(controller);
}

// const controller = loader({ path: 'iam:iam:get', handler: (context, data) => { console.log(data); return data * 2 } });
// const subcontroller = loader({ path: 'iam:iam:subscriber', subscriber: (context, data) => { console.log('here', data); return data * 2 } });

// addController(controller);
// addController(subcontroller);


