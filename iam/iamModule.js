import { Module } from '@nestjs/common';
import { IamController } from './iamController';


@Module({
    controllers: [IamController],
    providers: [],
  })
export class AppModule {}