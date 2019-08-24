import { DynamicModule } from "@nestjs/common";
import { ResolversExplorerService } from "./resolver";
import { HandlerDefMap, InjectMap } from "@notadd/magnus-core";
interface NestjsGrpcOptions {
    metadata: HandlerDefMap;
    controllers: InjectMap;
    decorators: object;
}
export declare class NestjsGrpcModule {
    private resolver;
    private options;
    resolvers: any;
    constructor(resolver: ResolversExplorerService, options: NestjsGrpcOptions);
    onModuleInit(): Promise<void>;
    static forRoot(options: NestjsGrpcOptions): DynamicModule;
}
export {};
