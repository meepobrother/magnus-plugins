import { Module } from "@nestjs/common";
import { GraphqlModule } from "@magnus-plugins/nest-graphql-fastify";
const metadata = require("./assets/mock/magnus.metadata.json");
const magnus = require("./assets/mock/magnus.server.json");
import { Controller } from "./inc/getUser";
@Module({
  imports: [
    GraphqlModule.forRoot({
      metadata,
      typeDefs: magnus,
      decorators: {}
    })
  ],
  providers: [Controller]
})
export class AppModule {}
