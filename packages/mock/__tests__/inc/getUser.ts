import { Core } from '@magnus-plugins/mock';
import {
    Magnus,
    Query,
    Mutation
} from "@notadd/magnus-core";
import { Where, Order } from "@notadd/magnus-core";
import { User } from './user';
import { ToDoItem } from './toDoItem';
import { db } from './db';
interface Limit {
    page?: number;
    psize?: number;
}
interface ListResult<T> {
    list: T[];
    count: number;
}

interface Message<T> {
    code: string;
    message: string;
    data: T;
}

interface Messages<T> {
    code: string;
    message: string;
    data: ListResult<T>;
}
/**
 * 接口规范，一旦制定，不容随意修改
 */
@Magnus({
    entities: [User, ToDoItem]
})
export class Controller<T> extends Core<T> {
    @Query()
    list(where?: Where<T>, order?: Order<T>, limit?: Limit): Messages<T> {
        const { page, psize } = limit || { page: 1, psize: 20 };
        let list: T[] = [];
        list = db[this.tablename]
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

    @Mutation()
    delete(id: number): Message<T> {
        let item: T;
        db[this.tablename] = db[this.tablename].filter(it => {
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

    @Mutation()
    deletes(ids: number[]): Message<T[]> {
        let item: T[] = [];
        db[this.tablename] = db[this.tablename].filter(it => {
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

    @Query()
    detail(id: number): Message<T> {
        const item = db[this.tablename].find(it => it.id === id);
        return {
            code: `B0001200`,
            message: `操作成功`,
            data: item
        };
    }

    @Mutation()
    update(id: number, data: Partial<T>): Message<T> {
        let item: T;
        db[this.tablename] = db[this.tablename].map(it => {
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

    @Mutation()
    edit(data: T): Message<T> {
        if ((data as any).id) {
            db[this.tablename].push(data);
            return { code: ``, message: ``, data };
        } else {
            const item = this.update((data as any).id, data);
            return { code: `B0001200`, message: `操作成功`, data: item.data };
        }
    }

    @Mutation()
    edits(datas: T[]): Message<T[]> {
        let items: T[] = [];
        datas.map(it => {
            items.push(this.edit(it).data);
        });
        return { code: `B0001200`, message: `操作成功`, data: items };
    }
}
