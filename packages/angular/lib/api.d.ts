import * as a from "apollo-angular";
export declare class Query<A, B> extends a.Query<A, B> {
    constructor(apollo: a.Apollo, client: string);
    watch(variables?: B, options?: any): a.QueryRef<A, B>;
}
export declare class Mutation<A, B> extends a.Mutation<A, B> {
    constructor(apollo: a.Apollo, client: string);
}
export declare class Subscription<A, B> extends a.Subscription<A, B> {
    constructor(apollo: a.Apollo, client: string);
}
