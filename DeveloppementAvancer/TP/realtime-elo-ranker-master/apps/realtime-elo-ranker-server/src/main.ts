import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Autoriser ton frontend
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type', // Assure-toi que Content-Type est autorisé
  });

  await app.listen(8080);
}
bootstrap();
