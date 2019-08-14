"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
exports.factory = {
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
