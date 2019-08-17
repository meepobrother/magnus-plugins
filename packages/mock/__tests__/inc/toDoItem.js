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
const user_1 = require("./user");
let ToDoItem = class ToDoItem {
};
__decorate([
    faker_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ToDoItem.prototype, "id", void 0);
__decorate([
    faker_1.Title(),
    __metadata("design:type", String)
], ToDoItem.prototype, "title", void 0);
__decorate([
    faker_1.Desc(),
    __metadata("design:type", String)
], ToDoItem.prototype, "desc", void 0);
__decorate([
    faker_1.Realname(),
    __metadata("design:type", String)
], ToDoItem.prototype, "username", void 0);
__decorate([
    faker_1.ManyToOne(),
    __metadata("design:type", user_1.User)
], ToDoItem.prototype, "user", void 0);
ToDoItem = __decorate([
    magnus_core_1.Entity()
], ToDoItem);
exports.ToDoItem = ToDoItem;
