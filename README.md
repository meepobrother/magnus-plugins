# magnus 插件

## @magnus-plugins/nest-graphql-fastify
> magnus的fastify插件

安装
```sh
yarn add @magnus-plugins/nest-graphql-fastify
```
入口文件
```ts
import { Module } from "@nestjs/common";
import { GraphqlModule } from "@magnus-plugins/nest-graphql-fastify";
// magnus生成后的说明文件
const metadata = require("./assets/fastity/magnus.metadata.json");
// magnus graphql DocumentNode 文件
const magnus = require("./assets/fastity/magnus.server.json");
import { IncController } from './resolver/inc';
@Module({
    imports: [
        GraphqlModule.forRoot({
            metadata,
            magnus
        })
    ],
    controllers: [
        IncController
    ]
})
export class AppModule { }
```
启动文件
```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";
async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    await app.init();
    app.listen(3000);
}
bootstrap();
```