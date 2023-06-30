import { NestFactory } from '@nestjs/core';
import { AccoutingModule } from './accounting.module';

async function bootstrap() {
  const app = await NestFactory.create(AccoutingModule);
  await app.listen(3000);
}
bootstrap();
