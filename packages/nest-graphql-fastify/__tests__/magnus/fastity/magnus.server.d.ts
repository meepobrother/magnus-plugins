export interface Demo {
    value?: number;
}
export interface Result {
    value?: number;
    dec(c: number, __selection?: string): Demo;
}
export interface Query {
    add<T>(a: number, b: number, __selection?: string): Promise<T & Result>;
}
