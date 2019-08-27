export interface GetUserResult {
    username?: string;
}
export interface Query {
    getUser<T>(__selection?: string): Promise<T & GetUserResult>;
}
