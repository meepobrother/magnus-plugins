"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
const factory = {
    Realname: () => faker.name.findName(),
    UserName: () => faker.internet.userName(),
    Email: () => faker.internet.email(),
    Mac: () => faker.internet.mac(),
    Password: () => faker.internet.password(),
    CardId: () => faker.finance.account(),
    Title: () => faker.name.title(),
    Desc: () => faker.company.catchPhraseDescriptor(),
    Content: () => faker.lorem.lines(255),
    Price: () => faker.commerce.price(),
    ProductName: () => faker.commerce.productName(),
    Lat: () => faker.address.latitude(),
    Lng: () => faker.address.longitude(),
    County: () => faker.address.country(),
    Country: () => faker.address.country(),
    StreetName: () => faker.address.streetName(),
    StreetAddress: () => faker.address.streetAddress(),
    SecondaryAddress: () => faker.address.secondaryAddress(),
    CompanyName: () => faker.company.companyName(),
    Image: () => faker.image.image(),
    Icon: () => faker.image.image(),
    Avatar: () => faker.image.avatar(),
    Ip: () => faker.internet.ip(),
    Color: () => faker.internet.color(),
    Phone: () => faker.phone.phoneNumber(),
    Number: () => faker.random.number(),
    Word: () => faker.random.word(),
    Words: () => faker.random.words(),
    Boolean: () => faker.random.boolean(),
    Uuid: () => faker.random.uuid()
};
class Factory {
    constructor(config, entities) {
        this.config = config;
        this.entities = entities;
        this.set = [];
    }
    createEntity(name) {
        const res = new this.entities[name]();
        const metadata = this.config[name];
        if (metadata) {
            metadata.map(column => {
                const num = faker.random.number({ min: 1, max: 5 });
                if ((column.decorators || []).includes("OneToMany") ||
                    (column.decorators || []).includes("ManyToMany") ||
                    (column.decorators || []).includes("TreeChildren")) {
                    // 创建多个
                    this.set.push(name);
                    res[column.name] = res[column.name] || [];
                    if (this.set.filter(it => it === name).length > 300) {
                        // 足够了
                    }
                    else {
                        for (let i = 0; i < num; i++) {
                            if (this.entities[column.entity]) {
                                res[column.name].push(this.createEntity(column.entity));
                            }
                        }
                    }
                }
                else {
                    column.decorators.map(dec => {
                        if (factory[dec] && typeof factory[dec] === "function") {
                            res[column.name] = factory[dec]();
                        }
                    });
                }
            });
        }
        return res;
    }
}
exports.Factory = Factory;
