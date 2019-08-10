import { Module } from "@nestjs/common";
import { GraphqlModule } from "../lib/index";
const metadata = require("./assets/fastity/magnus.metadata.json");
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
