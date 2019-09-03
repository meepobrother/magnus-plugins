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
