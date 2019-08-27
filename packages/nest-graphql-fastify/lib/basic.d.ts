import { Module } from '@nestjs/core/injector/module';
export declare class BaseExplorerService {
    getModules(modulesContainer: Map<string, Module>, include: Function[]): Module[];
    includeWhitelisted(modulesContainer: Map<string, Module>, include: Function[]): Module[];
}
