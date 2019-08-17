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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var MagnusAngular_1;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const apollo_angular_1 = require("apollo-angular");
const core_1 = require("@angular/core");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_angular_link_http_1 = require("apollo-angular-link-http");
const token_1 = require("./token");
const apollo_link_1 = require("apollo-link");
let MagnusAngular = MagnusAngular_1 = class MagnusAngular {
    constructor() { }
    static forChild(options) {
        return {
            ngModule: MagnusAngular_1,
            providers: [
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: (apollo, httpLink) => {
                        return () => {
                            const link = httpLink.create({
                                uri: options.apiUrl
                            });
                            const cache = new apollo_cache_inmemory_1.InMemoryCache();
                            apollo.createNamed(options.name, {
                                link: apollo_link_1.ApolloLink.from([...options.links, link]),
                                cache
                            });
                        };
                    },
                    deps: [apollo_angular_1.Apollo, apollo_angular_link_http_1.HttpLink],
                    multi: true
                },
                {
                    provide: token_1.MAGNUS_APOLLO,
                    useValue: options.name
                }
            ]
        };
    }
};
MagnusAngular = MagnusAngular_1 = __decorate([
    core_1.NgModule(),
    __metadata("design:paramtypes", [])
], MagnusAngular);
exports.MagnusAngular = MagnusAngular;
__export(require("./api"));
__export(require("./token"));
