import { Module, Inject, OnModuleInit, DynamicModule } from "@nestjs/common";
import { DocumentNode, graphql } from "graphql";
import { Config } from "apollo-server-core";
import { HandlerDefMap } from "@notadd/magnus-core";
import { makeExecutableSchema } from 'graphql-tools';
import { ResolversExplorerService, NestGraphqlClient } from '@magnus-plugins/nest-resolver';
import { setClient } from '@notadd/magnus-nest-runner';
interface GqlModuleOptions extends Config {
    name?: string;
    path?: string;
    fieldResolverEnhancers?: any[];
    typeDefs: DocumentNode;
    metadata: HandlerDefMap;
    entities?: object;
    decorators?: object;
}
const defaultOptions: any = {
    context: ({ req }) => ({
        req
    }),
    path: "/graphql",
    fieldResolverEnhancers: []
};
export const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
export const defaultContext = ({ req }) => ({ req });
@Module({
    providers: [ResolversExplorerService]
})
export class GraphqlModule implements OnModuleInit {
    application: any;
    constructor(
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
        this.options.resolvers = this.resolver.createResolver(
            this.options.metadata,
            this.options.entities,
            this.options.decorators || {}
        );
        const schema = makeExecutableSchema({
            typeDefs: this.options.typeDefs,
            resolvers: this.options.resolvers
        });
        const runner = (source: string, variableValues: any, rootValue?: any, contextValue?: any) => graphql({
            schema,
            source,
            rootValue,
            contextValue,
            variableValues
        });
        setClient(this.options.name!, new NestGraphqlClient(runner) as any)
    }
}
