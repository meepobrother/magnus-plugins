import { Module, DynamicModule, Inject } from "@nestjs/common";
import { ResolversExplorerService } from "./resolver";
import { HandlerDefMap, InjectMap } from "@notadd/magnus-core";
interface NestjsGrpcOptions {
  metadata: HandlerDefMap;
  controllers: InjectMap;
  decorators: object;
}
import { upperFirst } from "lodash";
import { GrpcMethodStreamingType } from "@nestjs/microservices";
import { NESTJS_GRPC_OPTIONS } from "./token";

@Module({
  providers: [ResolversExplorerService]
})
export class NestjsGrpcModule {
  resolvers: any;
  constructor(
    private resolver: ResolversExplorerService,
    @Inject(NESTJS_GRPC_OPTIONS) private options: NestjsGrpcOptions
  ) {}
  async onModuleInit() {
    this.resolvers = this.resolver.createResolver(
      this.options.metadata,
      this.options.decorators || {}
    );
  }

  static forRoot(options: NestjsGrpcOptions): DynamicModule {
    return {
      module: NestjsGrpcModule,
      providers: [
        {
          provide: NESTJS_GRPC_OPTIONS,
          useValue: options
        }
      ]
    };
  }
}
