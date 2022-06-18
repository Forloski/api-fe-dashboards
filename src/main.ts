import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
