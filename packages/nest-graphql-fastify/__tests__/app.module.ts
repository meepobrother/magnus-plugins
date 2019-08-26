import { Module } from "@nestjs/common";
import { GraphqlModule } from "../lib/index";
const metadata = require("./assets/fastity/magnus.metadata.json");
const magnus = require("./assets/fastity/magnus.server.json");
import { IncController } from "./resolver/inc";
import { Headers } from "../lib/index";
@Module({
  imports: [
    GraphqlModule.forRoot({
      metadata,
      typeDefs: magnus,
      decorators: {
        Headers
      }
    })
  ],
  controllers: [IncController]
})
export class AppModule {}
