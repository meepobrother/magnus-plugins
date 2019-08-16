import { Module } from "@nestjs/common";
import { GraphqlModule } from "@magnus-plugins/nest-graphql-fastify";
const metadata = require("./assets/mock/magnus.metadata.json");
const magnus = require("./assets/mock/magnus.server.json");
import { GetUserResolver } from "./inc/getUser";
@Module({
    imports: [
        GraphqlModule.forRoot({
            metadata,
            typeDefs: magnus,
            decorators: {}
        })
    ],
    providers: [GetUserResolver]
})
export class AppModule { }
