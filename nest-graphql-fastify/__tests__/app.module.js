"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_1 = require("../lib/index");
const metadata = require("./assets/fastity/magnus.metadata.json");
const magnus = require("./assets/fastity/magnus.server.json");
const inc_1 = require("./resolver/inc");
const index_2 = require("../lib/index");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            index_1.GraphqlModule.forRoot({
                metadata,
                typeDefs: magnus,
                decorators: {
                    Headers: index_2.Headers
                }
            })
        ],
        controllers: [inc_1.IncController]
    })
], AppModule);
exports.AppModule = AppModule;
