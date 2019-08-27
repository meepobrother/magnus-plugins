import { Query, Magnus, ResolveProperty, } from "@notadd/magnus-core";
import { Controller } from "@nestjs/common";
import { Entity, Selection, GetSelectionSet } from '@notadd/magnus-typeorm'
@Entity()
class Demo {
    value: number;
    constructor(val: number) {
        this.value = val;
    }
}
@Entity()
class Result {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    @ResolveProperty()
    dec(c: number, @GetSelectionSet() selection: any): Demo {
        console.log({
            selection
        })
        return new Demo(this.value - c)
    }
}
@Controller()
@Magnus()
export class IncController {
    @Query()
    add(a: number, b: number, @GetSelectionSet() selection: any): Result {
        console.log({
            selection
        })
        return new Result(a + b);
    }
}
