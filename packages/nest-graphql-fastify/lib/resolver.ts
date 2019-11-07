import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { Inject, Injectable } from "@nestjs/common";
import { BaseExplorerService } from "./basic";
import { Module } from "@nestjs/core/injector/module";
import { HandlerDefMap } from "@notadd/magnus-core";
import { ClientVisitor, ParseVisitor, ast } from "@notadd/magnus-graphql";
import { scalars } from "@notadd/magnus-graphql";
import { upperFirst } from "lodash";
import { GraphQLResolveInfo } from "graphql";
import { isObservable } from "rxjs";
import { PermissionError } from '@ganker/error';
@Injectable()
export class ResolversExplorerService extends BaseExplorerService {
    constructor(
        @Inject(ModulesContainer)
        private readonly modulesContainer: ModulesContainer
    ) {
        super();
    }

    createResolver(handlerDef: HandlerDefMap, decorators: object, preHandler: any) {
        const map = this.createFactoryByMap(handlerDef);
        const resolver: any = scalars;
        const client = new ClientVisitor();
        const parse = new ParseVisitor();
        Object.keys(map).map((key: string) => {
            const handler = map[key];
            resolver[upperFirst(key)] = {};
            Object.keys(handler).map(hKey => {
                const item = handler[hKey];
                resolver[upperFirst(key)][hKey] = async (
                    source: any,
                    args: any,
                    context: any,
                    info: GraphQLResolveInfo
                ) => {
                    const fieldName = info.fieldName;
                    let result: any;
                    const res = await preHandler(fieldName)
                    if (res) {
                        throw new PermissionError(`01`, `权限错误`)
                    }
                    await Promise.all(
                        info.fieldNodes.map(async field => {
                            let node = new ast.FieldAst();
                            node = node.visit(parse, field);
                            const field2 = node.visit(client, args);
                            const typeSource = typeof source;
                            const selfhandlerDef = handlerDef[key].find(
                                it => it[3] === fieldName
                            );
                            if (selfhandlerDef) {
                                const params = selfhandlerDef[4];
                                const parameters = new Array(params.length);
                                const selection = field2.selectionSet;
                                params.map(par => {
                                    const { name, type, index, decorator } = par;
                                    if (decorator.includes("Selection")) {
                                        parameters[index] = selection;
                                    } else if (decorator.includes("Parent")) {
                                        parameters[index] = source;
                                    } else if (decorator.includes("Relation")) {
                                        parameters[index] = undefined;
                                    } else if (decorator.includes("Context")) {
                                        parameters[index] = context;
                                    } else if (decorator.length === 0) {
                                        parameters[index] = args[name];
                                    } else if (decorator.length > 0) {
                                        decorator.map(dec => {
                                            parameters[index] = args[name];
                                            if (decorators[dec])
                                                parameters[index] = decorators[dec]()()(
                                                    context,
                                                    args[name]
                                                );
                                        });
                                    } else {
                                        parameters[index] = args[name];
                                    }
                                });
                                if (typeSource === "object") {
                                    result = await source[fieldName](...parameters);
                                } else if (typeSource === "undefined") {
                                    result = item(...parameters);
                                } else {
                                    result = source;
                                }
                            }
                        })
                    );
                    if (isObservable(result)) {
                        result = result.toPromise();
                    }
                    return result;
                };
            });
        });
        return resolver;
    }

    createFactoryByMap(
        map: HandlerDefMap
    ): { [key: string]: { [key: string]: any } } {
        const modules = this.getModules(this.modulesContainer, []);
        const factory: { [key: string]: { [key: string]: any } } = {};
        Object.keys(map).map(operationName => {
            const items = map[operationName] || [];
            const obj: any = {};
            items.forEach(it => {
                const [fieldName, className, tableName, methodName, argsDef] = it;
                // const controller = app.get(className);
                let controller = modules
                    .map(module => this.filterResolvers(className, module))
                    .filter(it => !!it);
                if (controller && controller.length === 1) {
                    const ctrl = controller[0];
                    obj[fieldName] = (...args: any[]) => {
                        return ctrl[methodName](...args);
                    };
                }
            });
            factory[operationName] = obj;
        });
        return factory;
    }

    filterResolvers(name: string, moduleRef: Module): any {
        const ctrl = moduleRef.controllers.get(name);
        if (ctrl) return ctrl.instance;
        const provi = moduleRef.providers.get(name);
        if (provi) return provi.instance;
    }
}
