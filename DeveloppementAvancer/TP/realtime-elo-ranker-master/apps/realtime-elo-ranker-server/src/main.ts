import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Activer CORS pour les requêtes de n'importe où

  await app.listen(8080);
}
bootstrap();
