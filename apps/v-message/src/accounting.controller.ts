import { Controller, Get } from '@nestjs/common';
import { AccoutingService } from './accounting.service';

@Controller()
export class AccoutingController {
  constructor(private readonly accoutingService: AccoutingService) {}

  @Get()
  getHello(): string {
    return this.accoutingService.getHello();
  }
}
