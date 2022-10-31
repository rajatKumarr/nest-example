import { Module } from '@nestjs/common';
import { GatewayController } from './controller';


@Module({
    imports: [],
    controllers: [GatewayController],
    providers: [],
})
export class AppModule { }