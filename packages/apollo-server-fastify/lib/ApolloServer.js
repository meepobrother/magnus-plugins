"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_playground_html_1 = require("@apollographql/graphql-playground-html");
const apollo_server_core_1 = require("apollo-server-core");
const fastifyApollo_1 = require("./fastifyApollo");
const fastJson = require("fast-json-stringify");
const stringifyHealthCheck = fastJson({
    type: "object",
    properties: {
        status: {
            type: "string"
        }
    }
});
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    supportsSubscriptions() {
        return true;
    }
    supportsUploads() {
        return false;
    }
    createHandler({ path, cors, disableHealthCheck, onHealthCheck } = {}) {
        this.graphqlPath = path ? path : "/graphql";
        const promiseWillStart = this.willStart();
        return async (app) => {
            await promiseWillStart;
            if (!disableHealthCheck) {
                app.get("/.well-known/apollo/server-health", async (req, res) => {
                    res.type("application/health+json");
                    if (onHealthCheck) {
                        try {
                            await onHealthCheck(req);
                            res.send(stringifyHealthCheck({ status: "pass" }));
                        }
                        catch (e) {
                            res.status(503).send(stringifyHealthCheck({ status: "fail" }));
                        }
                    }
                    else {
                        res.send(stringifyHealthCheck({ status: "pass" }));
                    }
                });
            }
            app.register(async (instance) => {
                instance.register(require("fastify-accepts"));
                if (cors === true) {
                    instance.register(require("fastify-cors"));
                }
                else if (cors !== false) {
                    instance.register(require("fastify-cors"), cors);
                }
                instance.setNotFoundHandler((_request, reply) => {
                    reply.code(405);
                    reply.header("allow", "GET, POST");
                    reply.send();
                });
                const beforeHandlers = [
                    (req, reply, done) => {
                        if (this.playgroundOptions && req.req.method === "GET") {
                            // perform more expensive content-type check only if necessary
                            const accept = req.accepts();
                            const types = accept.types();
                            const prefersHTML = types.find((x) => x === "text/html" || x === "application/json") === "text/html";
                            if (prefersHTML) {
                                const playgroundRenderPageOptions = {
                                    endpoint: this.graphqlPath,
                                    subscriptionEndpoint: this.subscriptionsPath,
                                    ...this.playgroundOptions
                                };
                                reply.type("text/html");
                                const playground = graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions);
                                reply.send(playground);
                                return;
                            }
                        }
                        done();
                    }
                ];
                instance.route({
                    method: ["GET", "POST"],
                    url: "/",
                    preHandler: beforeHandlers,
                    handler: await fastifyApollo_1.graphqlFastify(this.graphQLServerOptions.bind(this))
                });
            }, {
                prefix: this.graphqlPath
            });
        };
    }
}
exports.ApolloServer = ApolloServer;
exports.registerServer = () => {
    throw new Error("Please use server.createHandler instead of registerServer. This warning will be removed in the next release");
};
//# sourceMappingURL=ApolloServer.js.map