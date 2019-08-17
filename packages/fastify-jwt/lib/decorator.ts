import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator(
    (data, [root, args, ctx, info]) => {
        console.log({
            data, root, args, ctx, info
        })
    },
);
