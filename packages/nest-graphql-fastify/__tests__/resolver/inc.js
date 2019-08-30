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
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_core_1 = require("@notadd/magnus-core");
const common_1 = require("@nestjs/common");
const index_1 = require("../../lib/index");
let IncController = class IncController {
    add(a, b, headers) {
        console.log({
            headers
        });
        return a + b;
    }
};
__decorate([
    magnus_core_1.Query(),
    __param(2, index_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Number)
], IncController.prototype, "add", null);
IncController = __decorate([
    common_1.Controller(),
    magnus_core_1.Magnus()
], IncController);
exports.IncController = IncController;
//# sourceMappingURL=inc.js.map