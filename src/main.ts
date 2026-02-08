import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8081', // React Native Web
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();*/


/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8081', // React Native Web
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Autorise mobile + web pendant dev
  app.enableCors();

  await app.listen(3000, '0.0.0.0');
}
bootstrap();

