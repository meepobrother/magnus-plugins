import { ServerGrpc, GrpcMethodStreamingType } from "@nestjs/microservices";
import { HandlerDefMap, InjectMap, MagnusBase } from "@notadd/magnus-core";
import { upperFirst } from "lodash";
export interface NestGrpcOptions {
  protoPath: string;
  package: string;
  metadata: HandlerDefMap;
  controllers: InjectMap;
  decorators: object;
  url?: string;
  maxSendMessageLength?: number;
  maxReceiveMessageLength?: number;
  credentials?: any;
  protoLoader?: string;
  loader?: {
    keepCase?: boolean;
    alternateCommentMode?: boolean;
    longs?: Function;
    enums?: Function;
    bytes?: Function;
    defaults?: boolean;
    arrays?: boolean;
    objects?: boolean;
    oneofs?: boolean;
    json?: boolean;
    includeDirs?: string[];
  };
}

export class NestGrpc extends ServerGrpc {
  private metadata: HandlerDefMap;
  private controllers: InjectMap;
  private decorators: object;
  _grpcClient: any;
  constructor(private _options: NestGrpcOptions) {
    super({
      ..._options
    });
    this.metadata = this._options.metadata;
    this.controllers = this._options.controllers;
    this.decorators = this._options.decorators;
  }
  listen(callback: () => void) {
    Object.keys(this.metadata).map(key => {
      const obj = this.metadata[key];
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
            const type = this.controllers[className];
            const instance = new type() as MagnusBase;
            instance.tablename = tableName;
            const parameters = new Array(params.length);
            params.map(par => {
              const { name, type, index, decorator } = par;
              if (decorator.length === 0) {
                parameters[index] = args[name];
              } else if (decorator.length > 0) {
                decorator.map(dec => {
                  parameters[index] = args[name];
                  if (this.decorators[dec])
                    parameters[index] = this.decorators[dec]()()(args[name]);
                });
              } else {
                parameters[index] = args[name];
              }
            });
            const result = await instance[methodName](...parameters);
            if (Array.isArray(result)) {
              return result;
            } else if (typeof result === "object") {
              return result;
            } else {
              return {
                result
              };
            }
          };
          this.addHandler(serviceName, handler as any);
        });
      }
    });
    return super.listen(callback);
  }
}
