import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.init();
  app.listen(3000, () => {
    console.log(`app start`);
  });
}
bootstrap();
