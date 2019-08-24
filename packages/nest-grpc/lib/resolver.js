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
const lodash_1 = require("lodash");
const token_1 = require("./token");
const microservices_1 = require("@nestjs/microservices");
let ResolversExplorerService = class ResolversExplorerService extends basic_1.BaseExplorerService {
    constructor(modulesContainer, _options) {
        super(_options);
        this.modulesContainer = modulesContainer;
    }
    createResolver(handlerDef, decorators) {
        const map = this.createFactoryByMap(handlerDef);
        const resolver = magnus_graphql_1.scalars;
        Object.keys(map).map(key => {
            const obj = map[key];
            if (obj) {
                Object.keys(obj).map(method => {
                    const item = obj[method];
                    const [fileName, className, tableName, methodName, params] = item;
                    const serviceName = this.createPattern(lodash_1.upperFirst(key), fileName, microservices_1.GrpcMethodStreamingType.NO_STREAMING);
                    const handler = async (args) => {
                        return item(args);
                    };
                    this.addHandler(serviceName, handler);
                });
            }
        });
        return resolver;
    }
    createFactoryByMap(map) {
        const modules = this.getModules(this.modulesContainer, []);
        const factory = {};
        Object.keys(map).map(operationName => {
            const items = map[operationName] || [];
            const obj = {};
            items.forEach(it => {
                const [fieldName, className, tableName, methodName, argsDef] = it;
                // const controller = app.get(className);
                let controller = modules
                    .map(module => this.filterResolvers(className, module))
                    .filter(it => !!it);
                if (controller && controller.length === 1) {
                    const ctrl = controller[0];
                    obj[fieldName] = (...args) => {
                        ctrl.tablename = tableName;
                        return ctrl[methodName](...args);
                    };
                }
            });
            factory[operationName] = obj;
        });
        return factory;
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
    __param(1, common_1.Inject(token_1.NESTJS_GRPC_OPTIONS)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer, Object])
], ResolversExplorerService);
exports.ResolversExplorerService = ResolversExplorerService;
