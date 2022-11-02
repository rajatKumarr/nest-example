import { Module } from '@nestjs/common';
import { GatewayController } from './controller';
import { Gateway } from './websocketGateway';


@Module({
    imports: [],
    controllers: [GatewayController],
    providers: [Gateway],
})
export class AppModule { }