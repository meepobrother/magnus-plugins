import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { createMiddleware } from '@magnus-plugins/fastify-jwt';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    app.use(createMiddleware({
        secret: '123456'
    }));
    await app.init();
    app.listen(3000,()=>{
        console.log(`app start at 3000`)
    });
}
bootstrap();
