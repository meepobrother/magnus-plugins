import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { Inject, Injectable } from "@nestjs/common";
import { BaseExplorerService } from "./basic";
import { Module } from "@nestjs/core/injector/module";
import { HandlerDefMap, MagnusBase } from "@notadd/magnus-core";
import { ClientVisitor, ParseVisitor, ast } from "@notadd/magnus-graphql";
import { scalars } from "@notadd/magnus-graphql";
import { upperFirst } from "lodash";
import { GraphQLResolveInfo } from "graphql";
import { isObservable } from "rxjs";
import { NESTJS_GRPC_OPTIONS } from "./token";
import { GrpcMethodStreamingType } from "@nestjs/microservices";

@Injectable()
export class ResolversExplorerService extends BaseExplorerService {
  constructor(
    @Inject(ModulesContainer)
    private readonly modulesContainer: ModulesContainer,
    @Inject(NESTJS_GRPC_OPTIONS)
    _options: any
  ) {
    super(_options);
  }

  createResolver(handlerDef: HandlerDefMap, decorators: object) {
    const map = this.createFactoryByMap(handlerDef);
    const resolver: any = scalars;
    Object.keys(map).map(key => {
      const obj = map[key];
      if (obj) {
        Object.keys(obj).map(method => {
          const item = obj[method];
          const [fileName, className, tableName, methodName, params] = item;
          const serviceName = this.createPattern(
            upperFirst(key),
            fileName,
            GrpcMethodStreamingType.NO_STREAMING
          );
          const handler = async (args: any) => {
            return item(args);
          };
          this.addHandler(serviceName, handler as any);
        });
      }
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
          const ctrl = controller[0] as MagnusBase;
          obj[fieldName] = (...args: any[]) => {
            ctrl.tablename = tableName;
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
