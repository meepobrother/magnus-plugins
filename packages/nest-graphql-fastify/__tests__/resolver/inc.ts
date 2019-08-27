import { Query, Magnus, ResolveProperty, } from "@notadd/magnus-core";
import { Controller } from "@nestjs/common";
import { Entity, Selection } from '@notadd/magnus-typeorm'
@Entity()
class Result {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    @ResolveProperty()
    dec(c: number): number {
        return this.value - c
    }
}
@Controller()
@Magnus()
export class IncController {
    @Query()
    add(a: number, b: number, @Selection() selection: any): Result {
        console.log({
            selection
        })
        return new Result(a + b);
    }
}
