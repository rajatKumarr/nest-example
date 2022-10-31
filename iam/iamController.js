import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class IamController {
  @MessagePattern('iam:iam:get')
  async handler(...args) {
    console.log(args);
    return 'hey there senorita';
  }
}