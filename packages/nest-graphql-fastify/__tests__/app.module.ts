import { Module } from "@nestjs/common";
import { GraphqlModule } from "../lib/index";
const metadata = require("./assets/fastity/magnus.metadata.json");
const magnus = require("./assets/fastity/magnus.server.json");
const entities = require("./assets/fastity/magnus.entity.json");

import { IncController } from "./resolver/inc";
import { Headers } from "../lib/index";
@Module({
    imports: [
        GraphqlModule.forRoot({
            metadata,
            typeDefs: magnus,
            entities,
            decorators: {
                Headers
            }
        })
    ],
    controllers: [IncController]
})
export class AppModule { }
