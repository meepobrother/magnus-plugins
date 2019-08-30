"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const microservices_1 = require("@nestjs/microservices");
class BaseExplorerService extends microservices_1.ServerGrpc {
    getModules(modulesContainer, include) {
        if (!include || lodash_1.isEmpty(include)) {
            return [...modulesContainer.values()];
        }
        const whitelisted = this.includeWhitelisted(modulesContainer, include);
        return whitelisted;
    }
    includeWhitelisted(modulesContainer, include) {
        return [...modulesContainer.values()].filter(({ metatype }) => include.some(item => item === metatype));
    }
}
exports.BaseExplorerService = BaseExplorerService;
//# sourceMappingURL=basic.js.map