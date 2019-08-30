"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const entity = require("./assets/fastity/magnus.entity.json");
class Domain {
}
exports.Domain = Domain;
const faker = new lib_1.Factory(entity, {
    Domain
});
const domain = faker.createEntity("Domain");
debugger;
//# sourceMappingURL=index.js.map