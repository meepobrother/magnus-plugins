import { Module } from "@nestjs/common";
import { parse } from "graphql";
import { GraphqlModule } from "../lib/index";
import { readFileSync } from "fs";
import { join } from "path";
const metadata = require("./assets/fastity/magnus.metadata.json");

@Module({
  imports: [
    GraphqlModule.forRoot({
      metadata,
      magnus: parse(
        readFileSync(join(__dirname, "assets/fastity/magnus.graphql")).toString(
          "utf8"
        )
      )
    })
  ]
})
export class AppModule {}
