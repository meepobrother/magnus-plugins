/**
 * 默认有一些初始化数据
 */
import { Factory } from "@magnus-plugins/faker";
const config = require("../assets/mock/magnus.entity.json");
import { User } from './user';
import { ToDoItem } from './toDoItem';
const factory = new Factory(config, { User, ToDoItem });
export const db: { [key: string]: any[] } = {
    User: [],
    ToDoItem: []
};
db.User = factory.createEntities("User", 100, db);
db.User = factory.createEntities("ToDoItem", 100, db);
