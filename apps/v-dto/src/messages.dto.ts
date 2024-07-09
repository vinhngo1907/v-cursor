import { Controller, Get } from '@nestjs/common';
import { SheetService } from './user.dto';

@Controller()
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Get()
  getHello(): string {
    return this.sheetService.getHello();
  }
}
