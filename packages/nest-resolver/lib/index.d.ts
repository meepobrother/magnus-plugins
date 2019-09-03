import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { BaseExplorerService } from "./basic";
import { Module } from "@nestjs/core/injector/module";
import { HandlerDefMap } from "@notadd/magnus-core";
export declare class ResolversExplorerService extends BaseExplorerService {
    private readonly modulesContainer;
    constructor(modulesContainer: ModulesContainer);
    createResolver(handlerDef: HandlerDefMap, metadata: any, decorators: object): any;
    filterResolvers(name: string, moduleRef: Module): any;
}
interface NestGraphqlQuery {
    query: string;
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlMutate {
    mutation: string;
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlSubscribe {
    query: string;
    variables: any;
    root?: any;
    context?: any;
}
interface Runner {
    (doc: string, variables: any, root?: any, context?: any): any;
}
export declare class NestGraphqlClient {
    runner: Runner;
    constructor(runner: Runner);
    query(options: NestGraphqlQuery): any;
    mutate(options: NestGraphqlMutate): any;
    subscribe(options: NestGraphqlSubscribe): any;
}
export {};
