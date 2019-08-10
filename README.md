# magnus 插件

## @magnus-plugins/nest-graphql-fastify
> magnus的fastify插件

```sh
yarn add @magnus-plugins/nest-graphql-fastify
```

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