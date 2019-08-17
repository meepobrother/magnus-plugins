import { Module, Inject, OnModuleInit, DynamicModule } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ApolloServer } from "@magnus-plugins/apollo-server-fastify";
import { Config } from 'apollo-server-core';
import { HandlerDefMap } from "@notadd/magnus-core";
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { ResolversExplorerService } from "./resolver";
interface GqlModuleOptions extends Config {
    path?: string;
    fieldResolverEnhancers?: any[];
    metadata: HandlerDefMap;
}
const defaultOptions: any = {
    path: "/graphql",
    fieldResolverEnhancers: []
};
export const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
export const defaultContext = ({ req }) => ({ req });
@Module({
    providers: [
        MetadataScanner,
        ResolversExplorerService
    ]
})
export class GraphqlModule implements OnModuleInit {
    protected apolloServer: ApolloServer;
    application: any;
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly resolver: ResolversExplorerService,
        @Inject(GRAPHQL_MODULE_OPTIONS) private readonly options: GqlModuleOptions
    ) { }

    static forRoot(options: GqlModuleOptions): DynamicModule {
        options = {
            ...defaultOptions,
            ...options
        };
        return {
            module: GraphqlModule,
            providers: [
                {
                    provide: GRAPHQL_MODULE_OPTIONS,
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
        const resolvers = this.resolver.createResolver(this.options.metadata);
        this.options.resolvers = resolvers;
        this.options.context = this.options.context || defaultContext;
        this.registerGqlServer(this.options, app);
        this.apolloServer.installSubscriptionHandlers(httpAdapter.getHttpServer());
    }

    private registerGqlServer(apolloOptions: Config, app: any) {
        this.apolloServer = new ApolloServer(apolloOptions);
        app.register(this.apolloServer.createHandler({}));
    }
}
