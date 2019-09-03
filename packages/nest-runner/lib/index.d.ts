import { FetchResult, Observable, ApolloQueryResult } from "apollo-boost";
interface NestGraphqlQuery {
    query: string;
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlMutate {
    mutation: string;
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlSubscribe {
    query: string;
    variables: any;
    root?: any;
    context?: any;
}
export declare abstract class ApolloClient<T> {
    abstract query<A>(options: NestGraphqlQuery): Promise<ApolloQueryResult<A>>;
    abstract mutate<A>(options: NestGraphqlMutate): Promise<FetchResult<A>>;
    abstract subscribe<A>(options: NestGraphqlSubscribe): Observable<FetchResult<A>>;
}
export declare function setClient(name: string, runner: ApolloClient<any>): void;
export declare class Query<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<ApolloQueryResult<A>>;
}
export declare class Mutation<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<FetchResult<A>>;
}
export declare class Subscription<A, B> {
    document: any;
    client: string;
    run(variables: B): Observable<FetchResult<A>>;
}
export {};
