export const GRAPHQL_MODULE_OPTIONS = "GqlModuleOptions";
import { Config } from "apollo-server-core";
import { DocumentNode } from "graphql";
import { HandlerDefMap } from "@notadd/magnus-core";
import { SelectionSet } from '@notadd/magnus-typeorm';

export interface GqlModuleOptions extends Config {
    name?: string;
    path?: string;
    fieldResolverEnhancers?: any[];
    typeDefs: DocumentNode;
    metadata: HandlerDefMap;
    entities?: object;
    decorators?: object;
    preHandler?: (set: SelectionSet) => boolean;
    afterHandler?: <T>(set: SelectionSet, res: T) => T;
}
