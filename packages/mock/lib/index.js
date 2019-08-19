"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_core_1 = require("@notadd/magnus-core");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const platform_fastify_1 = require("@nestjs/platform-fastify");
class Core extends magnus_core_1.MagnusBase {
    __filter(it, where) {
        return true;
    }
    __sort(a, b, sort) {
        return -1;
    }
}
exports.Core = Core;
async function bootstrap(appModule, port) {
    const app = await core_1.NestFactory.create(appModule, new platform_fastify_1.FastifyAdapter());
    await app.init();
    app.listen(port, "0.0.0.0", () => {
        console.log(`app start ${port}`);
    });
}
exports.bootstrap = bootstrap;
async function bootstrapGrpc(appModule, options) {
    const app = await core_1.NestFactory.createMicroservice(appModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            ...options,
            loader: {
                defaults: true,
                arrays: true,
                objects: true,
                oneofs: true,
                json: true
            }
        }
    });
    await app.init();
    app.listen(() => {
        console.log(`app start ${options.url}`);
    });
}
exports.bootstrapGrpc = bootstrapGrpc;
class Database {
    constructor() {
        this.tables = new Map();
    }
}
exports.Database = Database;
