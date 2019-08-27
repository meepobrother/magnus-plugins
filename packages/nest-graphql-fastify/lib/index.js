"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./graphql.module"));
exports.Headers = () => () => (variable, that) => {
    if (that) {
        return that.context.req.headers;
    }
};
exports.CurrentUser = () => () => (variable, that) => {
    if (that) {
        return that.context.req.headers;
    }
};
//# sourceMappingURL=index.js.map