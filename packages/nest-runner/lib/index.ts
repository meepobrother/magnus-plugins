import {
    FetchResult,
    Observable,
    ApolloQueryResult,
} from "apollo-boost";
interface NestGraphqlQuery {
    query: string,
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlMutate {
    mutation: string,
    variables: any;
    root?: any;
    context?: any;
}
interface NestGraphqlSubscribe {
    query: string,
    variables: any;
    root?: any;
    context?: any;
}
export abstract class ApolloClient<T> {
    abstract query<A>(options: NestGraphqlQuery): Promise<ApolloQueryResult<A>>;
    abstract mutate<A>(options: NestGraphqlMutate): Promise<FetchResult<A>>;
    abstract subscribe<A>(options: NestGraphqlSubscribe): Observable<FetchResult<A>>;
}
const clients: Map<string, ApolloClient<any>> = new Map();
export function setClient(name: string, runner: ApolloClient<any>) {
    clients.set(name, runner);
}
export class Query<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<ApolloQueryResult<A>> {
        return clients.get(this.client)!.query({
            query: this.document,
            variables: variables
        });
    }
}

export class Mutation<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<FetchResult<A>> {
        return clients.get(this.client)!.mutate({
            mutation: this.document,
            variables: variables
        });
    }
}

export class Subscription<A, B> {
    document: any;
    client: string;
    run(variables: B): Observable<FetchResult<A>> {
        return clients.get(this.client)!.subscribe({
            query: this.document,
            variables: variables
        });
    }
}
