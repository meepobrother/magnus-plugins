import { OnModuleInit, DynamicModule } from "@nestjs/common";
import { DocumentNode } from "graphql";
import { Config } from "apollo-server-core";
import { HandlerDefMap } from "@notadd/magnus-core";
import { ResolversExplorerService } from '@magnus-plugins/nest-resolver';
interface GqlModuleOptions extends Config {
    name?: string;
    path?: string;
    fieldResolverEnhancers?: any[];
    typeDefs: DocumentNode;
    metadata: HandlerDefMap;
    entities?: object;
    decorators?: object;
}
export declare const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
export declare const defaultContext: ({ req }: {
    req: any;
}) => {
    req: any;
};
export declare class GraphqlModule implements OnModuleInit {
    private readonly resolver;
    private readonly options;
    application: any;
    constructor(resolver: ResolversExplorerService, options: GqlModuleOptions);
    static forRoot(options: GqlModuleOptions): DynamicModule;
    onModuleInit(): Promise<void>;
}
export {};
