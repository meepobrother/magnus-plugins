"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_container_1 = require("@nestjs/core/injector/modules-container");
const common_1 = require("@nestjs/common");
const basic_1 = require("./basic");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const magnus_typeorm_1 = require("@notadd/magnus-typeorm");
let ResolversExplorerService = class ResolversExplorerService extends basic_1.BaseExplorerService {
    constructor(modulesContainer) {
        super();
        this.modulesContainer = modulesContainer;
    }
    createResolver(handlerDef, metadata, decorators) {
        const resolver = magnus_graphql_1.scalars;
        const modules = this.getModules(this.modulesContainer, []);
        const resolvers = magnus_typeorm_1.createResolvers(handlerDef, metadata, decorators, (name) => {
            const results = modules
                .map(module => this.filterResolvers(name, module))
                .filter(it => !!it);
            if (results.length === 1)
                return results[0];
        });
        return { ...resolver, ...resolvers };
    }
    filterResolvers(name, moduleRef) {
        const ctrl = moduleRef.controllers.get(name);
        if (ctrl)
            return ctrl.instance;
        const provi = moduleRef.providers.get(name);
        if (provi)
            return provi.instance;
    }
};
ResolversExplorerService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(modules_container_1.ModulesContainer)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer])
], ResolversExplorerService);
exports.ResolversExplorerService = ResolversExplorerService;
class NestGraphqlClient {
    constructor(runner) {
        this.runner = runner;
    }
    query(options) {
        return this.runner(options.query, options.variables, options.root, options.context);
    }
    mutate(options) {
        return this.runner(options.mutation, options.variables, options.root, options.context);
    }
    subscribe(options) {
        return this.runner(options.query, options.variables, options.root, options.context);
    }
}
exports.NestGraphqlClient = NestGraphqlClient;
//# sourceMappingURL=index.js.map