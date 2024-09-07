import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    app.use(["/swagger"], basicAuth({
        challenge: true,
        users: {
            [configService.get<string>('DOC_USER')]: configService.get<string>('DOC_PASS')
        }
    }));
    const swaggerConfig = new DocumentBuilder()
        .setTitle('User Service')
        .setDescription('User Service API description')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    await app.listen(3000);
}

bootstrap();
