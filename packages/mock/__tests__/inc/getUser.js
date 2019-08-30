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
const mock_1 = require("@magnus-plugins/mock");
const magnus_core_1 = require("@notadd/magnus-core");
const user_1 = require("./user");
const toDoItem_1 = require("./toDoItem");
const db_1 = require("./db");
/**
 * 接口规范，一旦制定，不容随意修改
 */
let Controller = class Controller extends mock_1.Core {
    list(where, order, limit) {
        const { page, psize } = limit || { page: 1, psize: 20 };
        let list = [];
        list = db_1.db[this.tablename]
            .filter(it => this.__filter(it, where))
            .sort((a, b) => this.__sort(a, b, order))
            .slice((page - 1) * psize, psize);
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: {
                count: 100,
                list: list
            }
        };
    }
    delete(id) {
        let item;
        db_1.db[this.tablename] = db_1.db[this.tablename].filter(it => {
            if (it.id === id) {
                item = it;
                return false;
            }
            return true;
        });
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: item
        };
    }
    deletes(ids) {
        let item = [];
        db_1.db[this.tablename] = db_1.db[this.tablename].filter(it => {
            if (ids.includes(it.id)) {
                item.push(it);
                return false;
            }
            return true;
        });
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: item
        };
    }
    detail(id) {
        const item = db_1.db[this.tablename].find(it => it.id === id);
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: item
        };
    }
    update(id, data) {
        let item;
        db_1.db[this.tablename] = db_1.db[this.tablename].map(it => {
            if (it.id === id) {
                item = {
                    ...it,
                    ...data
                };
                return item;
            }
            return it;
        });
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: item
        };
    }
    edit(data) {
        if (data.id) {
            db_1.db[this.tablename].push(data);
            return { code: ``, message: ``, data };
        }
        else {
            const item = this.update(data.id, data);
            return { code: `B0001200`, message: `操作成功`, data: item.data };
        }
    }
    edits(datas) {
        let items = [];
        datas.map(it => {
            items.push(this.edit(it).data);
        });
        return { code: `B0001200`, message: `操作成功`, data: items };
    }
};
__decorate([
    magnus_core_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Object)
], Controller.prototype, "list", null);
__decorate([
    magnus_core_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], Controller.prototype, "delete", null);
__decorate([
    magnus_core_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Object)
], Controller.prototype, "deletes", null);
__decorate([
    magnus_core_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], Controller.prototype, "detail", null);
__decorate([
    magnus_core_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], Controller.prototype, "update", null);
__decorate([
    magnus_core_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], Controller.prototype, "edit", null);
__decorate([
    magnus_core_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Object)
], Controller.prototype, "edits", null);
Controller = __decorate([
    magnus_core_1.Magnus({
        entities: [user_1.User, toDoItem_1.ToDoItem]
    })
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=getUser.js.map