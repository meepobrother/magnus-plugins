"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const strategy_1 = require("./strategy");
async function bootstrap(app, options) {
    const application = await core_1.NestFactory.createMicroservice(app, {
        strategy: new strategy_1.NestGrpc(options)
    });
    application.listen(() => {
        console.log(`app start at ${options.url}`);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map