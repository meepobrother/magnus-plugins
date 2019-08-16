import { Factory } from "../lib";
const entity = require("./assets/fastity/magnus.entity.json");
export class Domain {}
const faker = new Factory(entity, {
  Domain
});
const domain = faker.createEntity("Domain");
debugger;
