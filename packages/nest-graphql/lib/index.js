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
var GraphqlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const nest_resolver_1 = require("@magnus-plugins/nest-resolver");
const magnus_nest_runner_1 = require("@notadd/magnus-nest-runner");
const defaultOptions = {
    context: ({ req }) => ({
        req
    }),
    path: "/graphql",
    fieldResolverEnhancers: []
};
exports.GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
exports.defaultContext = ({ req }) => ({ req });
let GraphqlModule = GraphqlModule_1 = class GraphqlModule {
    constructor(resolver, options) {
        this.resolver = resolver;
        this.options = options;
    }
    static forRoot(options) {
        options = {
            ...defaultOptions,
            ...options
        };
        return {
            module: GraphqlModule_1,
            providers: [
                {
                    provide: exports.GRAPHQL_MODULE_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
    async onModuleInit() {
        this.options.resolvers = this.resolver.createResolver(this.options.metadata, this.options.entities, this.options.decorators || {});
        const schema = graphql_tools_1.makeExecutableSchema({
            typeDefs: this.options.typeDefs,
            resolvers: this.options.resolvers
        });
        const runner = (source, variableValues, rootValue, contextValue) => graphql_1.graphql({
            schema,
            source,
            rootValue,
            contextValue,
            variableValues
        });
        magnus_nest_runner_1.setClient(this.options.name, new nest_resolver_1.NestGraphqlClient(runner));
    }
};
GraphqlModule = GraphqlModule_1 = __decorate([
    common_1.Module({
        providers: [nest_resolver_1.ResolversExplorerService]
    }),
    __param(1, common_1.Inject(exports.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [nest_resolver_1.ResolversExplorerService, Object])
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=index.js.map