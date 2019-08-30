"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nest_graphql_fastify_1 = require("@magnus-plugins/nest-graphql-fastify");
const metadata = require("./assets/mock/magnus.metadata.json");
const magnus = require("./assets/mock/magnus.server.json");
const getUser_1 = require("./inc/getUser");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_graphql_fastify_1.GraphqlModule.forRoot({
                metadata,
                typeDefs: magnus,
                decorators: {}
            })
        ],
        providers: [getUser_1.Controller]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map