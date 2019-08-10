import { Module, Inject } from "@nestjs/common";
import { OnModuleInit, DynamicModule } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ApolloServer, Config } from "@nger/apollo-server-fastify";
import { createResolver } from "@nger/nest-graphql-resolver";
import { DocumentNode } from "graphql";
import { HandlerDefMap } from "@notadd/magnus-core";
interface GqlModuleOptions extends Config {
  path?: string;
  fieldResolverEnhancers?: any[];
  magnus: DocumentNode;
  metadata: HandlerDefMap;
}
const defaultOptions: any = {
  path: "/graphql",
  fieldResolverEnhancers: []
};
export const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
@Module({})
export class GraphqlModule implements OnModuleInit {
  protected apolloServer: ApolloServer;
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(GRAPHQL_MODULE_OPTIONS) private readonly options: GqlModuleOptions
  ) {}
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
    const resolvers = createResolver(this.options.metadata, app);
    this.registerGqlServer({
      typeDefs: this.options.magnus,
      resolvers
    });
    this.apolloServer.installSubscriptionHandlers(httpAdapter.getHttpServer());
  }

  private registerGqlServer(apolloOptions: Config) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const app = httpAdapter.getInstance();
    this.apolloServer = new ApolloServer(apolloOptions);
    app.register(this.apolloServer.createHandler({}));
  }
}
