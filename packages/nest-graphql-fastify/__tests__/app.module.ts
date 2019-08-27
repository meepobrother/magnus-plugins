import { Module } from "@nestjs/common";
import { GraphqlModule } from "../lib/index";
const metadata = require("./assets/fastity/magnus.metadata.json");
const magnus = require("./assets/fastity/magnus.server.json");
const entities = require("./assets/fastity/magnus.entity.json");
import { IncController } from "./resolver/inc";
import { Headers, CurrentUser } from "../lib/index";
import { Selection, Relation } from '@notadd/magnus-typeorm'
@Module({
    imports: [
        GraphqlModule.forRoot({
            metadata,
            typeDefs: magnus,
            entities,
            decorators: {
                Headers,
                CurrentUser
            }
        })
    ],
    controllers: [IncController]
})
export class AppModule { }
