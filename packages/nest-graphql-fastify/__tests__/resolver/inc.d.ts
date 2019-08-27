declare class Demo {
    value: number;
    constructor(val: number);
}
declare class Result {
    value: number;
    constructor(value: number);
    dec(c: number, selection: any): Demo;
}
export declare class IncController {
    add(a: number, b: number, selection: any): Result;
}
export {};
