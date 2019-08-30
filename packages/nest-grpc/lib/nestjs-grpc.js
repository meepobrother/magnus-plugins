"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NestjsGrpcModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const common_1 = require("@nestjs/common");
const resolver_1 = require("./resolver");
const token_1 = require("./token");
let NestjsGrpcModule = NestjsGrpcModule_1 = class NestjsGrpcModule {
    constructor(resolver, options) {
        this.resolver = resolver;
        this.options = options;
    }
    async onModuleInit() {
        this.resolvers = this.resolver.createResolver(this.options.metadata, this.options.decorators || {});
    }
    static forRoot(options) {
        return {
            module: NestjsGrpcModule_1,
            providers: [
                {
                    provide: token_1.NESTJS_GRPC_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
};
NestjsGrpcModule = NestjsGrpcModule_1 = __decorate([
    common_1.Module({
        providers: [resolver_1.ResolversExplorerService]
    }),
    __param(1, common_1.Inject(token_1.NESTJS_GRPC_OPTIONS)),
    __metadata("design:paramtypes", [resolver_1.ResolversExplorerService, Object])
], NestjsGrpcModule);
exports.NestjsGrpcModule = NestjsGrpcModule;
//# sourceMappingURL=nestjs-grpc.js.map