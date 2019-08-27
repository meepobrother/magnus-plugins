/// <reference types="node" />
import { Middleware } from 'fastify';
import * as http from 'http';
export declare type DecodeToken = {
    [key: string]: string;
} | null | string;
export declare type TokenCreater = (req: http.IncomingMessage, header: Object, payload: Object) => Promise<string>;
export declare type IsRevoked = (req: http.IncomingMessage, header: Object, payload: Object) => Promise<boolean>;
export declare type GetToken = (req: http.IncomingMessage) => Promise<string>;
export declare const defaultGetToken: GetToken;
export interface NunuOptions {
    secret: string | TokenCreater;
    /**
     * 校验参数
     */
    verifyOptions?: VerifyOptions;
    /**
     * 挂载到header
     */
    requestProperty?: string;
    /**
     * 获取header中的token
     */
    getToken?: GetToken;
}
export declare const verifyOptions: VerifyOptions;
export interface VerifyOptions {
    algorithms?: string[];
    audience?: string | RegExp | Array<string>;
    clockTimestamp?: number;
    clockTolerance?: number;
    issuer?: string | string[];
    ignoreExpiration?: boolean;
    ignoreNotBefore?: boolean;
    jwtid?: string;
    subject?: string;
}
/**
 * 中间件
 * @param options
 */
export declare function createMiddleware<HttpServer = http.Server, HttpRequest extends http.IncomingMessage = http.IncomingMessage, HttpResponse = http.ServerResponse>(options: NunuOptions): Middleware<HttpServer, HttpRequest, HttpResponse>;
export { CurrentUser } from './decorator';
