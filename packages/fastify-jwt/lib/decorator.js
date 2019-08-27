"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.CurrentUser = common_1.createParamDecorator((data, [root, args, ctx, info]) => {
    console.log({
        data, root, args, ctx, info
    });
});
//# sourceMappingURL=decorator.js.map