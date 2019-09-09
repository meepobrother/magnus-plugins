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
const core_1 = require("@nestjs/core");
const apollo_server_fastify_1 = require("apollo-server-fastify");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const nest_resolver_1 = require("@magnus-plugins/nest-resolver");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
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
    constructor(httpAdapterHost, resolver, options) {
        this.httpAdapterHost = httpAdapterHost;
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
        if (!this.httpAdapterHost) {
            return;
        }
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        if (!httpAdapter) {
            return;
        }
        const app = httpAdapter.getInstance();
        this.options.resolvers = this.resolver.createResolver(this.options.metadata, this.options.entities, this.options.decorators || {});
        this.options.resolvers = {
            ...magnus_graphql_1.scalars,
            ...this.options.resolvers
        };
        this.registerGqlServer(app);
        this.apolloServer.installSubscriptionHandlers(httpAdapter.getHttpServer());
    }
    registerGqlServer(app) {
        this.apolloServer = new apollo_server_fastify_1.ApolloServer(this.options);
        app.register(this.apolloServer.createHandler({
            path: this.options.path
        }));
    }
};
GraphqlModule = GraphqlModule_1 = __decorate([
    common_1.Module({
        providers: [metadata_scanner_1.MetadataScanner, nest_resolver_1.ResolversExplorerService]
    }),
    __param(2, common_1.Inject(exports.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        nest_resolver_1.ResolversExplorerService, Object])
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=graphql.module.js.map