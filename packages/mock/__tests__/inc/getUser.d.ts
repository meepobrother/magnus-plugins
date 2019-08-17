import { Core } from '@magnus-plugins/mock';
import { Where, Order } from "@notadd/magnus-core";
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
export declare class Controller<T> extends Core<T> {
    list(where?: Where<T>, order?: Order<T>, limit?: Limit): Messages<T>;
    delete(id: number): Message<T>;
    deletes(ids: number[]): Message<T[]>;
    detail(id: number): Message<T>;
    update(id: number, data: Partial<T>): Message<T>;
    edit(data: T): Message<T>;
    edits(datas: T[]): Message<T[]>;
}
export {};
