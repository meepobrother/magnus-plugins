import {
    UserName,
    Factory,
    Password,
    Realname,
    Title,
    Desc,
    PrimaryGeneratedColumn
} from "@magnus-plugins/faker";
import {
    Magnus,
    Query,
    Entity,
    OneToMany,
    MagnusBase,
    Mutation
} from "@notadd/magnus-core";
const config = require("../assets/mock/magnus.entity.json");

@Entity()
export class ToDoItem {
    @PrimaryGeneratedColumn()
    uid: number;

    @Title()
    title: string;

    @Desc()
    desc: string;

    @Realname()
    username: string;
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: number;

    @UserName()
    username: string;

    @Password()
    password: string;

    @Realname()
    realname: string;

    @OneToMany()
    todoItems: ToDoItem[];
}

const factory = new Factory(config, { User, ToDoItem });
import { Where, Order } from "@notadd/magnus-core";
interface Limit {
    page?: number;
    psize?: number;
}
interface ListResult<T> {
    list: T[];
    count: number;
}
/**
 * 默认有一些初始化数据
 */
export const db: { [key: string]: any[] } = {
    User: factory.createEntities('User', 100)
}
/**
 * 接口规范，一旦制定，不容随意修改
 */
@Magnus({
    entities: [User, ToDoItem]
})
export class Controller<T> extends MagnusBase<T> {
    @Query()
    list(where?: Where<T>, order?: Order<T>, limit?: Limit): ListResult<T> {
        const { page, psize } = limit || { page: 1, psize: 20 };
        let list: T[] = [];
        list = db[this.tablename].sort((a, b) => {
            return a.id - b.id;
        }).slice((page - 1) * psize, psize);
        console.log({
            where,
            order,
            limit,
            list
        })
        return { list: list, count: 100 };
    }

    @Mutation()
    delete(id: number): T {
        let item: T;
        db[this.tablename] = db[this.tablename].filter(it => {
            if (it.id === id) {
                item = it;
                return false;
            }
            return true;
        });
        return item;
    }

    @Mutation()
    deletes(ids: number[]): T[] {
        let item: T[] = [];
        db[this.tablename] = db[this.tablename].filter(it => {
            if (ids.includes(it.id)) {
                item.push(it);
                return false;
            }
            return true;
        });
        return item;
    }

    @Query()
    detail(id: number): T {
        return db[this.tablename].find(it => it.id === id)
    }

    @Mutation()
    update(id: number, data: Partial<T>): T {
        let item: T;
        db[this.tablename] = db[this.tablename].map(it => {
            if (it.id === id) {
                item = {
                    ...it,
                    ...data
                }
                return item;
            }
            return it;
        });
        return factory.createEntity(this.tablename);
    }

    @Mutation()
    edit(data: T): T {
        if ((data as any).id) {
            db[this.tablename].push(data);
            return data;
        } else {
            return this.update((data as any).id, data);
        }
    }

    @Mutation()
    edits(datas: T[]): T[] {
        let items: T[] = [];
        datas.map(it => {
            items.push(this.edit(it));
        });
        return items;
    }
}
