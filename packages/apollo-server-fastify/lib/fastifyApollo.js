"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
async function graphqlFastify(options) {
    if (!options) {
        throw new Error("Apollo Server requires options.");
    }
    return async (request, reply) => {
        try {
            /**
             * 这里可以拿到input和output
             */
            const { graphqlResponse, responseInit } = await apollo_server_core_1.runHttpQuery([request, reply], {
                method: request.req.method,
                options,
                query: request.req.method === "POST" ? request.body : request.query,
                request: apollo_server_core_1.convertNodeHttpToRequest(request.raw)
            });
            if (responseInit.headers) {
                for (const [name, value] of Object.entries(responseInit.headers)) {
                    reply.header(name, value);
                }
            }
            reply.serializer((payload) => payload);
            reply.send(graphqlResponse);
        }
        catch (error) {
            /**
             * 这里可以拿到错误，并进行处理
             */
            if ("HttpQueryError" !== error.name) {
                throw error;
            }
            if (error.headers) {
                Object.keys(error.headers).forEach(header => {
                    reply.header(header, error.headers[header]);
                });
            }
            reply.code(error.statusCode);
            reply.serializer((payload) => payload);
            reply.send(error.message);
        }
    };
}
exports.graphqlFastify = graphqlFastify;
