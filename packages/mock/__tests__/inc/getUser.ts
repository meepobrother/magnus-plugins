import { UserName } from "@magnus-plugins/faker";
import { Resolver, Query, Magnus } from '@notadd/magnus-core';

@Magnus()
export class GetUserResult {
    @UserName()
    username: string;
}

@Resolver()
export class GetUserResolver {
    @Query()
    getUser(): GetUserResult {
        return new GetUserResult();
    }
}

