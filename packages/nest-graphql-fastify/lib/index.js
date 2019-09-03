"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./graphql.module"));
exports.Headers = () => (target, propertyKey, parameterIndex) => (ctx) => ctx.req.headers;
exports.CurrentUser = () => (target, propertyKey, parameterIndex) => (ctx) => ctx.req.user;
//# sourceMappingURL=index.js.map