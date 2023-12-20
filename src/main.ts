import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5555);
}
bootstrap();
//typeorm migration:create ./src/migrations/name
//"typeorm": "typeorm-ts-node-commonjs"
