import { Module } from "@nestjs/core/injector/module";
import { isEmpty } from "lodash";
import { ServerGrpc, GrpcMethodStreamingType } from "@nestjs/microservices";

export class BaseExplorerService extends ServerGrpc {
  getModules(
    modulesContainer: Map<string, Module>,
    include: Function[]
  ): Module[] {
    if (!include || isEmpty(include)) {
      return [...modulesContainer.values()];
    }
    const whitelisted = this.includeWhitelisted(modulesContainer, include);
    return whitelisted;
  }

  includeWhitelisted(
    modulesContainer: Map<string, Module>,
    include: Function[]
  ): Module[] {
    return [...modulesContainer.values()].filter(({ metatype }) =>
      include.some(item => item === metatype)
    );
  }
}
