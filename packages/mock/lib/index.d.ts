import { Where, Order, MagnusBase } from "@notadd/magnus-core";
export declare class Core<T> extends MagnusBase<T> {
    __filter(it: T, where: Where<T>): boolean;
    __sort(a: T, b: T, sort: Order<T>): number;
}
export declare function bootstrap(appModule: any, port: number): Promise<void>;
export declare class Database {
    tables: Map<string, any[]>;
}
