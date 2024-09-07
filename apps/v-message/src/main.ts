import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService = app.get(ConfigService);

	app.use(['/swagger'], basicAuth({
		challenge: true,
		users: {
			[configService.get<string>('DOC_USER')]: configService.get<string>('DOC_PASS')
		},
	}),
	);
	await app.listen(configService.get<string>('APP_PORT'));
}
bootstrap();