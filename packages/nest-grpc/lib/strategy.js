"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const lodash_1 = require("lodash");
class NestGrpc extends microservices_1.ServerGrpc {
    constructor(_options) {
        super({
            ..._options
        });
        this._options = _options;
        this.metadata = this._options.metadata;
        this.controllers = this._options.controllers;
        this.decorators = this._options.decorators;
    }
    listen(callback) {
        Object.keys(this.metadata).map(key => {
            const obj = this.metadata[key];
            if (obj) {
                Object.keys(obj).map(method => {
                    const item = obj[method];
                    const [fileName, className, tableName, methodName, params] = item;
                    const serviceName = this.createPattern(lodash_1.upperFirst(key), fileName, microservices_1.GrpcMethodStreamingType.NO_STREAMING);
                    const handler = async (args) => {
                        const type = this.controllers[className];
                        const instance = new type();
                        instance.tablename = tableName;
                        const parameters = new Array(params.length);
                        params.map(par => {
                            const { name, type, index, decorator } = par;
                            if (decorator.length === 0) {
                                parameters[index] = args[name];
                            }
                            else if (decorator.length > 0) {
                                decorator.map(dec => {
                                    parameters[index] = args[name];
                                    if (this.decorators[dec])
                                        parameters[index] = this.decorators[dec]()()(args[name]);
                                });
                            }
                            else {
                                parameters[index] = args[name];
                            }
                        });
                        const result = await instance[methodName](...parameters);
                        if (Array.isArray(result)) {
                            return result;
                        }
                        else if (typeof result === "object") {
                            return result;
                        }
                        else {
                            return {
                                result
                            };
                        }
                    };
                    this.addHandler(serviceName, handler);
                });
            }
        });
        return super.listen(callback);
    }
}
exports.NestGrpc = NestGrpc;
