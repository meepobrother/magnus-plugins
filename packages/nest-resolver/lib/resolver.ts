import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { Inject, Injectable } from "@nestjs/common";
import { BaseExplorerService } from "./basic";
import { Module } from "@nestjs/core/injector/module";
import { HandlerDefMap } from "@notadd/magnus-core";
import { scalars } from "@notadd/magnus-graphql";
import { createResolvers } from "@notadd/magnus-typeorm";

@Injectable()
export class ResolversExplorerService extends BaseExplorerService {
    constructor(
        @Inject(ModulesContainer)
        private readonly modulesContainer: ModulesContainer
    ) {
        super();
    }

    createResolver(handlerDef: HandlerDefMap, metadata: any, decorators: object, preHandler?: any, afterHandler?: any) {
        const resolver: any = scalars;
        const modules = this.getModules(this.modulesContainer, []);
        const resolvers = createResolvers(
            handlerDef,
            metadata,
            decorators,
            preHandler,
            afterHandler,
            (name: string) => {
                const results = modules
                    .map(module => this.filterResolvers(name, module))
                    .filter(it => !!it);
                if (results.length === 1) return results[0];
            }
        );
        return { ...resolver, ...resolvers };
    }

    filterResolvers(name: string, moduleRef: Module): any {
        const ctrl = moduleRef.controllers.get(name);
        if (ctrl) return ctrl.instance;
        const provi = moduleRef.providers.get(name);
        if (provi) return provi.instance;
    }
}

interface NestGraphqlQuery {
    query: string,
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlMutate {
    mutation: string,
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlSubscribe {
    query: string,
    variables: any;
    root?: any;
    context?: any;
}
interface Runner {
    (doc: string, variables: any, root?: any, context?: any)
}
export class NestGraphqlClient {
    constructor(public runner: Runner) { }
    query(options: NestGraphqlQuery) {
        return this.runner(options.query, options.variables, options.root, options.context)
    }
    mutate(options: NestGraphqlMutate) {
        return this.runner(options.mutation, options.variables, options.root, options.context)
    }
    subscribe(options: NestGraphqlSubscribe) {
        return this.runner(options.query, options.variables, options.root, options.context)
    }
}
