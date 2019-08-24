import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { BaseExplorerService } from "./basic";
import { Module } from "@nestjs/core/injector/module";
import { HandlerDefMap } from "@notadd/magnus-core";
export declare class ResolversExplorerService extends BaseExplorerService {
    private readonly modulesContainer;
    constructor(modulesContainer: ModulesContainer, _options: any);
    createResolver(handlerDef: HandlerDefMap, decorators: object): any;
    createFactoryByMap(map: HandlerDefMap): {
        [key: string]: {
            [key: string]: any;
        };
    };
    filterResolvers(name: string, moduleRef: Module): any;
}
