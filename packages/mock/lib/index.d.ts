import { Where, Order, MagnusBase } from "@notadd/magnus-core";
export declare class Core<T> extends MagnusBase<T> {
    __filter(it: T, where: Where<T>): boolean;
    __sort(a: T, b: T, sort: Order<T>): number;
}
export declare function bootstrap(appModule: any, port: number): Promise<void>;
interface GrpcOptions {
    url?: string;
    maxSendMessageLength?: number;
    maxReceiveMessageLength?: number;
    credentials?: any;
    protoPath: string;
    package: string;
    loader?: {
        keepCase?: boolean;
        alternateCommentMode?: boolean;
        longs?: Function;
        enums?: Function;
        bytes?: Function;
        defaults?: boolean;
        arrays?: boolean;
        objects?: boolean;
        oneofs?: boolean;
        json?: boolean;
        includeDirs?: string[];
    };
}
export declare function bootstrapGrpc(appModule: any, options: GrpcOptions): Promise<void>;
export declare class Database {
    tables: Map<string, any[]>;
}
export {};
