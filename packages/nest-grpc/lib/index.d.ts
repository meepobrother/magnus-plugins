import { ServerGrpc } from "@nestjs/microservices";
import { HandlerDefMap, InjectMap } from "@notadd/magnus-core";
interface NestGrpcOptions {
    protoPath: string;
    package: string;
    metadata: HandlerDefMap;
    controllers: InjectMap;
    decorators: object;
    url?: string;
    maxSendMessageLength?: number;
    maxReceiveMessageLength?: number;
    credentials?: any;
    protoLoader?: string;
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
export declare class NestGrpc extends ServerGrpc {
    private _options;
    private metadata;
    private controllers;
    private decorators;
    _grpcClient: any;
    constructor(_options: NestGrpcOptions);
    listen(callback: () => void): Promise<void>;
}
export declare function bootstrap(options: NestGrpcOptions): void;
export {};
