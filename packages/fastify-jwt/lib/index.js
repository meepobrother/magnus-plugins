"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.defaultGetToken = async (req) => {
    let parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
        let scheme = parts[0];
        let credentials = parts[1];
        if (scheme === 'Bearer') {
            return credentials;
        }
    }
};
exports.verifyOptions = {
    algorithms: ['HS256']
};
/**
 * 中间件
 * @param options
 */
function createMiddleware(options) {
    return async (req, res, callback) => {
        if ((!options && !options.secret) || req.method === 'OPTIONS') {
            return callback();
        }
        const requestProperty = options.requestProperty || 'user';
        let token = '';
        const getToken = options.getToken || exports.defaultGetToken;
        try {
            token = await getToken(req);
            if (!token) {
                return callback();
            }
            let dtoken = '';
            dtoken = jsonwebtoken_1.decode(token, { complete: true }) || {};
            async function getSecret() {
                return new Promise((resolve, reject) => {
                    if (typeof options.secret === 'string') {
                        resolve(options.secret);
                    }
                    else {
                        if (dtoken !== null && typeof (dtoken) !== 'string') {
                            resolve(options.secret(req, dtoken.header, dtoken.payload));
                        }
                    }
                });
            }
            async function verifyToken(secret) {
                return new Promise((resolve, reject) => {
                    const _currentOptions = options.verifyOptions || exports.verifyOptions;
                    jsonwebtoken_1.verify(token, secret, _currentOptions, (err, revoked) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(revoked);
                        }
                    });
                });
            }
            const secret = await getSecret();
            const vtoken = await verifyToken(secret);
            Object.defineProperty(req, requestProperty, {
                value: vtoken
            });
            callback();
        }
        catch (e) {
            return callback();
        }
    };
}
exports.createMiddleware = createMiddleware;
var decorator_1 = require("./decorator");
exports.CurrentUser = decorator_1.CurrentUser;
//# sourceMappingURL=index.js.map