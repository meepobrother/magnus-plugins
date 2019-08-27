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
const magnus_typeorm_1 = require("@notadd/magnus-typeorm");
let Demo = class Demo {
    constructor(val) {
        this.value = val;
    }
};
Demo = __decorate([
    magnus_typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number])
], Demo);
let Result = class Result {
    constructor(value) {
        this.value = value;
    }
    dec(c, selection) {
        console.log({
            selection
        });
        return new Demo(this.value - c);
    }
};
__decorate([
    magnus_core_1.ResolveProperty(),
    __param(1, magnus_typeorm_1.GetSelectionSet()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Demo)
], Result.prototype, "dec", null);
Result = __decorate([
    magnus_typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number])
], Result);
let IncController = class IncController {
    add(a, b, selection) {
        console.log({
            selection
        });
        return new Result(a + b);
    }
};
__decorate([
    magnus_core_1.Query(),
    __param(2, magnus_typeorm_1.GetSelectionSet()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Result)
], IncController.prototype, "add", null);
IncController = __decorate([
    common_1.Controller(),
    magnus_core_1.Magnus()
], IncController);
exports.IncController = IncController;
//# sourceMappingURL=inc.js.map