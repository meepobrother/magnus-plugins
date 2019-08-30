"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../lib/index");
const path_1 = require("path");
const test_1 = require("./inc/test");
const metadata = require("./assets/fastity/magnus.metadata.json");
const app_1 = require("./app");
index_1.bootstrap(app_1.AppModule, {
    url: `0.0.0.0:3004`,
    protoPath: path_1.join(__dirname, "assets/fastity/magnus.server.proto"),
    package: `fastity`,
    metadata,
    controllers: {
        TestMagnus: test_1.TestMagnus
    },
    decorators: {}
});
//# sourceMappingURL=index.js.map