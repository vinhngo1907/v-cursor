import { NestFactory } from '@nestjs/core';
import { SheetModule } from './user-web.dto';

async function bootstrap() {
  const app = await NestFactory.create(SheetModule);
  await app.listen(3000);
}
bootstrap();
