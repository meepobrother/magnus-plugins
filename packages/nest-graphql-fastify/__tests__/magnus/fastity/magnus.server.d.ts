export interface Query {
    add<T>(a: number, b: number, __selection?: string): Promise<T & number>;
}
