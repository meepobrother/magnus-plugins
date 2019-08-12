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
const magnus_graphql_2 = require("@notadd/magnus-graphql");
const lodash_1 = require("lodash");
let ResolversExplorerService = class ResolversExplorerService extends basic_1.BaseExplorerService {
    constructor(modulesContainer) {
        super();
        this.modulesContainer = modulesContainer;
    }
    createResolver(handlerDef, decorators) {
        const map = this.createFactoryByMap(handlerDef);
        const resolver = magnus_graphql_2.scalars;
        const client = new magnus_graphql_1.ClientVisitor();
        const parse = new magnus_graphql_1.ParseVisitor();
        Object.keys(map).map((key) => {
            const handler = map[key];
            resolver[lodash_1.upperFirst(key)] = {};
            Object.keys(handler).map(hKey => {
                const item = handler[hKey];
                resolver[lodash_1.upperFirst(key)][hKey] = async (source, args, context, info) => {
                    const fieldName = info.fieldName;
                    let result;
                    await Promise.all(info.fieldNodes.map(async (field) => {
                        let node = new magnus_graphql_1.ast.FieldAst();
                        node = node.visit(parse, field);
                        const field2 = node.visit(client, args);
                        const typeSource = typeof source;
                        const selfhandlerDef = handlerDef[key].find(it => it[3] === fieldName);
                        if (selfhandlerDef) {
                            const params = selfhandlerDef[4];
                            const parameters = new Array(params.length);
                            const selection = field2.selectionSet;
                            params.map(par => {
                                const { name, type, index, decorator } = par;
                                if (decorator === "Selection") {
                                    parameters[index] = selection;
                                }
                                else if (decorator === "Parent") {
                                    parameters[index] = source;
                                }
                                else if (decorator === "Relation") {
                                    parameters[index] = undefined;
                                }
                                else if (decorator === "Context") {
                                    parameters[index] = context;
                                }
                                else if (decorator) {
                                    parameters[index] = decorators[decorator]()()(context);
                                }
                                else {
                                    parameters[index] = args[name];
                                }
                            });
                            if (typeSource === "object") {
                                result = await source[fieldName](...parameters);
                            }
                            else if (typeSource === "undefined") {
                                result = item(...parameters);
                            }
                            else {
                                result = source;
                            }
                        }
                    }));
                    return result;
                };
            });
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
        return ctrl && ctrl.instance;
    }
};
ResolversExplorerService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(modules_container_1.ModulesContainer)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer])
], ResolversExplorerService);
exports.ResolversExplorerService = ResolversExplorerService;