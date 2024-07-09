import { Module } from '@nestjs/common';
import { SheetController } from './messages.dto';
import { SheetService } from './user.dto';

@Module({
  imports: [],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
