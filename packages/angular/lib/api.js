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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const a = __importStar(require("apollo-angular"));
const token_1 = require("./token");
const core_1 = require("@angular/core");
let Query = class Query extends a.Query {
    constructor(apollo, client) {
        console.log(client);
        super(apollo);
        this.client = client;
    }
    watch(variables, options) {
        return super.watch(variables, options);
    }
};
Query = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Self()), __param(1, core_1.Inject(token_1.MAGNUS_APOLLO)),
    __metadata("design:paramtypes", [a.Apollo, String])
], Query);
exports.Query = Query;
let Mutation = class Mutation extends a.Mutation {
    constructor(apollo, client) {
        console.log(client);
        super(apollo);
        this.client = client;
    }
};
Mutation = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Self()), __param(1, core_1.Inject(token_1.MAGNUS_APOLLO)),
    __metadata("design:paramtypes", [a.Apollo, String])
], Mutation);
exports.Mutation = Mutation;
let Subscription = class Subscription extends a.Subscription {
    constructor(apollo, client) {
        console.log(client);
        super(apollo);
        this.client = client;
    }
};
Subscription = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Self()), __param(1, core_1.Inject(token_1.MAGNUS_APOLLO)),
    __metadata("design:paramtypes", [a.Apollo, String])
], Subscription);
exports.Subscription = Subscription;
