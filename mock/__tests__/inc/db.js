"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 默认有一些初始化数据
 */
const faker_1 = require("@magnus-plugins/faker");
const config = require("../assets/mock/magnus.entity.json");
const user_1 = require("./user");
const toDoItem_1 = require("./toDoItem");
const factory = new faker_1.Factory(config, { User: user_1.User, ToDoItem: toDoItem_1.ToDoItem });
exports.db = {
    User: [],
    ToDoItem: []
};
exports.db.User = factory.createEntities("User", 100, exports.db);
exports.db.User = factory.createEntities("ToDoItem", 100, exports.db);
