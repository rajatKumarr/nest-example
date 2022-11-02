import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const transporterConfig = {
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
            durable: false
        },
    },
}


export async function getClient() {
    const client = ClientProxyFactory.create(transporterConfig);
    await client.connect();
    console.log('connected...');
    return client;
}
