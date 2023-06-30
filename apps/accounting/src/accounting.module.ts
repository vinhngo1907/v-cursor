import { Module } from '@nestjs/common';
import { AccoutingController } from './accounting.controller';
import { AccoutingService } from './accounting.service';

@Module({
  imports: [],
  controllers: [AccoutingController],
  providers: [AccoutingService],
})
export class AccoutingModule {}