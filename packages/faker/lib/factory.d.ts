interface Type<T> extends Function {
    new (...args: any[]): T;
}
interface ColumnMetadata {
    name: string;
    decorators: string[];
    entity: string;
}
declare type Metadata = ColumnMetadata[];
interface Config {
    [key: string]: Metadata;
}
interface Entities {
    [key: string]: Type<any>;
}
export declare class Factory {
    config: Config;
    entities: Entities;
    randomLen: {
        min: number;
        max: number;
    };
    total: number;
    constructor(config: Config, entities: Entities, randomLen?: {
        min: number;
        max: number;
    }, total?: number);
    set: string[];
    createEntity<T>(name: string): T;
}
export {};
