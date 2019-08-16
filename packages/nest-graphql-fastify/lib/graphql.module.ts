import { Module, Inject, OnModuleInit, DynamicModule } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ApolloServer } from "@magnus-plugins/apollo-server-fastify";
import { DocumentNode } from "graphql";
import { Config } from "apollo-server-core";
import { HandlerDefMap } from "@notadd/magnus-core";
import { MetadataScanner } from "@nestjs/core/metadata-scanner";
import { ResolversExplorerService } from "./resolver";
export const defaultContext = ({ req }) => ({ req });
interface GqlModuleOptions extends Config {
  path?: string;
  fieldResolverEnhancers?: any[];
  typeDefs: DocumentNode;
  metadata: HandlerDefMap;
  decorators?: object;
}
const defaultOptions: any = {
  context: defaultContext,
  path: "/graphql",
  fieldResolverEnhancers: []
};
export const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
@Module({
  providers: [MetadataScanner, ResolversExplorerService]
})
export class GraphqlModule implements OnModuleInit {
  protected apolloServer: ApolloServer;
  application: any;
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly resolver: ResolversExplorerService,
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
    this.options.resolvers = this.resolver.createResolver(
      this.options.metadata,
      this.options.decorators || {}
    );
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
