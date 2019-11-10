import { Module, Inject, OnModuleInit, DynamicModule } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ApolloServer } from "@magnus-plugins/apollo-server-fastify";
import { MetadataScanner } from "@nestjs/core/metadata-scanner";
import { NestResolverModule, ResolversExplorerService } from '@magnus-plugins/nest-resolver';
import { scalars } from '@notadd/magnus-graphql'
import { GRAPHQL_MODULE_OPTIONS, GqlModuleOptions } from './static'
const defaultOptions: any = {
    context: ({ req, res }) => ({
        req,
        res
    }),
    path: "/graphql",
    fieldResolverEnhancers: []
};
import { MagnusRunner } from './runner';
export const defaultContext = ({ req }) => ({ req });
@Module({
    imports: [NestResolverModule],
    providers: [MetadataScanner, MagnusRunner],
    exports: [
        MagnusRunner
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
        this.options.resolvers = this.resolver.createResolver(
            this.options.metadata,
            this.options.entities,
            this.options.decorators || {},
            this.options.preHandler,
            this.options.afterHandler
        );
        this.options.resolvers = {
            ...scalars,
            ...this.options.resolvers
        }
        this.registerGqlServer(app);
        this.apolloServer.installSubscriptionHandlers(httpAdapter.getHttpServer());
    }

    private registerGqlServer(app: any) {
        this.apolloServer = new ApolloServer(this.options);
        app.register(
            this.apolloServer.createHandler({
                path: this.options.path
            })
        );
    }
}
