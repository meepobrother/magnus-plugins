import {
        Double,
        Float,
        Int32,
        Uint32,
        Sint32,
        Fixed32,
        Sfixed32,
        Int64,
        Uint64,
        Sint64,
        Fixed64,
        Sfixed64,
        Bool,
        String,
        Bytes,
        Empty,
        ID
    } from '@notadd/magnus-core';
    import { Observable } from 'rxjs';
    
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