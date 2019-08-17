import { FastifyError, Middleware } from 'fastify';
import * as http from 'http';
import { decode, verify } from 'jsonwebtoken';
export type DecodeToken = { [key: string]: string } | null | string;
export type TokenCreater = (req: http.IncomingMessage, header: Object, payload: Object) => Promise<string>;
export type IsRevoked = (req: http.IncomingMessage, header: Object, payload: Object) => Promise<boolean>;
export type GetToken = (req: http.IncomingMessage) => Promise<string>;
export const defaultGetToken: GetToken = async (req: http.IncomingMessage) => {
    let parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
        let scheme = parts[0];
        let credentials = parts[1];
        if (scheme === 'Bearer') {
            return credentials;
        }
    }
}
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
export const verifyOptions: VerifyOptions = {
    algorithms: ['HS256']
};
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
export function createMiddleware<HttpServer = http.Server, HttpRequest extends http.IncomingMessage = http.IncomingMessage, HttpResponse = http.ServerResponse>(options: NunuOptions): Middleware<HttpServer, HttpRequest, HttpResponse> {
    return async (req: HttpRequest, res: HttpResponse, callback: (err?: FastifyError) => void) => {
        if ((!options && !options.secret) || req.method === 'OPTIONS') {
            return callback();
        }
        const requestProperty = options.requestProperty || 'user';
        let token: string = '';
        const getToken = options.getToken || defaultGetToken;
        try {
            token = await getToken(req);
            if (!token) {
                return callback();
            }
            let dtoken: DecodeToken = '';
            dtoken = decode(token, { complete: true }) || {};
            async function getSecret(): Promise<string> {
                return new Promise((resolve, reject) => {
                    if (typeof options.secret === 'string') {
                        resolve(options.secret);
                    } else {
                        if (dtoken !== null && typeof (dtoken) !== 'string') {
                            resolve(options.secret(req, dtoken.header, dtoken.payload));
                        }
                    }
                });
            }
            async function verifyToken(secret: string): Promise<object | string> {
                return new Promise((resolve, reject) => {
                    const _currentOptions = options.verifyOptions || verifyOptions;
                    verify(token, secret, _currentOptions, (err, revoked) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(revoked);
                        }
                    });
                });
            }
            const secret = await getSecret();
            const vtoken = await verifyToken(secret);
            Object.defineProperty(req, requestProperty, {
                value: vtoken
            })
            callback();
        } catch (e) {
            return callback();
        }
    }
}
export { CurrentUser } from './decorator'