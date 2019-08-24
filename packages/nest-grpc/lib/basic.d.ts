import { Module } from "@nestjs/core/injector/module";
import { ServerGrpc } from "@nestjs/microservices";
export declare class BaseExplorerService extends ServerGrpc {
    getModules(modulesContainer: Map<string, Module>, include: Function[]): Module[];
    includeWhitelisted(modulesContainer: Map<string, Module>, include: Function[]): Module[];
}
