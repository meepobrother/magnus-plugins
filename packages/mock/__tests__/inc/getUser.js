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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@magnus-plugins/faker");
const magnus_core_1 = require("@notadd/magnus-core");
let GetUserResult = class GetUserResult {
};
__decorate([
    faker_1.UserName(),
    __metadata("design:type", String)
], GetUserResult.prototype, "username", void 0);
GetUserResult = __decorate([
    magnus_core_1.Magnus()
], GetUserResult);
exports.GetUserResult = GetUserResult;
let GetUserResolver = class GetUserResolver {
    getUser() {
        return new GetUserResult();
    }
};
__decorate([
    magnus_core_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", GetUserResult)
], GetUserResolver.prototype, "getUser", null);
GetUserResolver = __decorate([
    magnus_core_1.Resolver()
], GetUserResolver);
exports.GetUserResolver = GetUserResolver;
//# sourceMappingURL=getUser.js.map