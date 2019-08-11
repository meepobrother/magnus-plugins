
## @magnus-plugins/nest-graphql-fastify
> magnus的fastify插件,没有依赖typescript,magnus编译后运行,为什么不用@nestjs/graphql,@nestjs/graphql依赖ts-morph(typescript),运行速度慢，发布体积大。

安装
```sh
yarn add @magnus-plugins/nest-graphql-fastify
```
控制器
```ts
import { Query, Magnus } from "@notadd/magnus-core";
import { Controller } from '@nestjs/common';

@Controller()
@Magnus()
export class IncController {
    @Query()
    add(a: number, b: number): number {
        return a + b;
    }
}
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